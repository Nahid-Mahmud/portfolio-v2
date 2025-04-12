import { NextRequest, NextResponse } from "next/server";
import { portfolioContext } from "@/lib/portfolio-context"; // Adjust path if needed

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

interface ContentPart {
  text: string;
}

interface ConversationTurn {
  role: "user" | "model";
  parts: ContentPart[];
}

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
      conversationHistory = [];
    }

    const systemInstruction: ConversationTurn = {
      role: "user",
      parts: [{ text: portfolioContext }],
    };

    let finalContents: ConversationTurn[];
    if (
      conversationHistory.length > 0 &&
      conversationHistory[0].role === "user" &&
      conversationHistory[0].parts[0]?.text.startsWith("You are an AI assistant embedded in")
    ) {
      finalContents = [systemInstruction, ...conversationHistory];
    } else {
      finalContents = [systemInstruction, ...conversationHistory];
    }

    console.log(`Sending conversation to Gemini with ${finalContents.length} turns (including context).`);

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: finalContents,

        generationConfig: {
          temperature: 0.7,
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

    const candidate = responseData.candidates?.[0];
    const generatedText = candidate?.content?.parts?.[0]?.text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finishReason = (candidate as any)?.finishReason;

    if (finishReason && finishReason !== "STOP") {
      console.warn(`Gemini response finished with reason: ${finishReason}`);
      // You might want to return a generic message if it was blocked for safety
      if (finishReason === "SAFETY") {
        return NextResponse.json({ answer: "I cannot provide a response to that topic due to safety guidelines." });
      }
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
