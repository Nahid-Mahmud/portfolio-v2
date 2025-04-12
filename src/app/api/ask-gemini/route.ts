// src/app/api/ask-gemini/route.ts
import { NextRequest, NextResponse } from "next/server";
// Import the context you just created
import { portfolioContext } from "@/lib/portfolio-context"; // Adjust path if needed

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Define the structure for a single content part
interface ContentPart {
  text: string;
}

// Define the structure for a single message/turn in the conversation history
interface ConversationTurn {
  role: "user" | "model";
  parts: ContentPart[];
}

// Define the expected request body structure coming from the frontend
interface RequestBody {
  contents: ConversationTurn[]; // Expecting the conversation history
}

// Define expected structure of the Google API response
interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string; // Expecting 'model'
    };
    // Add other potential fields if needed
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    console.error("Error: GOOGLE_API_KEY environment variable is not set.");
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }

  try {
    const body = (await req.json()) as RequestBody;
    let conversationHistory = body.contents; // Get the history from the frontend

    // --- Basic Validation ---
    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      // Allow empty history for first message
      // If the frontend sends an empty array for the very first message, initialize it
      conversationHistory = [];
      // return NextResponse.json({ error: "Invalid conversation history provided." }, { status: 400 });
    }

    // --- *** ADD PORTFOLIO CONTEXT *** ---
    // Create the initial instruction turn using the imported context.
    // We give it the 'user' role as Gemini expects alternating user/model turns,
    // and this acts as the initial instruction from the 'system' (represented as user).
    const systemInstruction: ConversationTurn = {
      role: "user",
      parts: [{ text: portfolioContext }],
    };

    // Construct the final payload for the API
    // Prepend the system instruction BEFORE the actual chat history.
    // However, check if the history already starts with our specific instruction text to avoid adding it repeatedly.
    // This check is basic and might need refinement if the context text changes often.
    let finalContents: ConversationTurn[];
    if (
      conversationHistory.length > 0 &&
      conversationHistory[0].role === "user" &&
      conversationHistory[0].parts[0]?.text.startsWith("You are an AI assistant embedded in")
    ) {
      // If the history already seems to contain the instruction (e.g., from a previous turn in a session), don't add it again.
      // NOTE: This check assumes the frontend sends the *full* history including the context message back.
      // If the frontend only sends user/model turns *after* the initial context, you would always prepend.
      // Let's assume the frontend *does* send the full history back for simplicity for now.
      // --> CORRECTION: The frontend code provided earlier ONLY sends user/model turns.
      // --> So, we SHOULD always prepend the instruction. Removing the check.

      finalContents = [systemInstruction, ...conversationHistory];
    } else {
      // If history is empty or doesn't start with the context, prepend it.
      finalContents = [systemInstruction, ...conversationHistory];
    }

    console.log(`Sending conversation to Gemini with ${finalContents.length} turns (including context).`);
    // console.log("Sending Contents:", JSON.stringify(finalContents, null, 2)); // For debugging the full payload

    // --- Call the Google Gemini API ---
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pass the history WITH the prepended context
        contents: finalContents,
        // Optional: Add generationConfig or safetySettings if needed
        generationConfig: {
          temperature: 0.7, // Adjust creativity vs factualness (lower is more factual)
          // topP: 0.9,
          // maxOutputTokens: 500, // Limit response length if needed
        },
        safetySettings: [
          // Example safety settings - adjust as needed
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });

    const responseData: GeminiResponse = await response.json();
    console.log("Gemini API Response Status:", response.status);
    // console.log("Gemini Raw Response:", JSON.stringify(responseData, null, 2)); // Debug raw response

    // Error handling for API call itself or Gemini reporting an error
    if (!response.ok || responseData.error) {
      console.error("Gemini API Error:", responseData.error || `HTTP status ${response.status}`);
      const errorMessage = responseData.error?.message || `Gemini API request failed with status ${response.status}`;
      // Provide more specific feedback for common errors if possible
      if (response.status === 400 && errorMessage.includes("User location is not supported")) {
        return NextResponse.json(
          { error: "API access error: User location not supported for this model." },
          { status: 400 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json({ error: "API rate limit exceeded. Please try again later." }, { status: 429 });
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status || 500 });
    }

    // --- Refined Response Extraction and Safety Check ---
    const candidate = responseData.candidates?.[0];
    const generatedText = candidate?.content?.parts?.[0]?.text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finishReason = (candidate as any)?.finishReason; // Cast to any to access potential extra fields

    // Check if the response was blocked due to safety settings or other reasons
    if (finishReason && finishReason !== "STOP") {
      console.warn(`Gemini response finished with reason: ${finishReason}`);
      // You might want to return a generic message if it was blocked for safety
      if (finishReason === "SAFETY") {
        return NextResponse.json({ answer: "I cannot provide a response to that topic due to safety guidelines." });
      }
      // Handle other finish reasons (like MAX_TOKENS) if necessary
      // For now, we still try to return the text if available, even if truncated
    }

    if (!generatedText) {
      console.error("Could not extract text from Gemini response:", JSON.stringify(responseData, null, 2));
      // Check for specific block scenarios often indicated by missing content but no explicit error
      if (!candidate?.content) {
        console.warn("Response likely blocked by safety settings (no content returned).");
        return NextResponse.json(
          { answer: "My response was blocked likely due to safety filters. Please try rephrasing your question." },
          { status: 200 }
        ); // Return 200 OK but with a message
      }
      return NextResponse.json({ error: "Failed to parse response from AI." }, { status: 500 });
    }

    console.log(`Sending back answer snippet: ${generatedText.substring(0, 100)}...`);

    // Send back only the latest AI answer
    return NextResponse.json({ answer: generatedText });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in /api/ask-gemini:", error);
    if (error instanceof SyntaxError) {
      // Error parsing the incoming request JSON
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }
    return NextResponse.json({ error: "An internal server error occurred.", details: error.message }, { status: 500 });
  }
}
