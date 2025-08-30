/* eslint-disable @typescript-eslint/no-explicit-any */
import { portfolioContext } from "@/lib/portfolio-context";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Ensure this environment variable is set
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "https://nahid-mahmud.xyz", // Optional. Set your site URL
    "X-Title": process.env.SITE_NAME || "Portfolio - Md. Nahid Mahmud", // Optional. Set your site name
  },
});

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("Error: OPENROUTER_API_KEY environment variable is not set.");
    return NextResponse.json({ error: "API key not configured." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const conversationHistory = body.contents || [];

    // Prepare the messages for the OpenAI API (content as string, not array)
    const validRoles = ["system", "user", "assistant"];
    const messages = conversationHistory
      .map((turn: any) => ({
        role: turn.role,
        content: turn.parts.map((part: any) => part.text).join(" "),
      }))
      // Filter out invalid roles and empty content
      .filter((msg: any) => validRoles.includes(msg.role) && msg.content && msg.content.trim().length > 0);

    // Add system instruction as the first message (role: 'system')
    messages.unshift({
      role: "system",
      content: portfolioContext,
    });

    console.log(`Sending conversation to OpenAI with ${messages.length} messages.`);
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      // model: "google/learnlm-1.5-pro-experimental:free",
      messages,
    });
    // console.log(completion);

    const responseMessage = completion.choices[0]?.message?.content;
    console.log(responseMessage);
    // return;

    if (!responseMessage) {
      console.error("No response message received from OpenAI.");
      return NextResponse.json({ error: "Failed to parse response from AI." }, { status: 500 });
    }

    console.log(`Sending back answer snippet: ${responseMessage.substring(0, 100)}...`);

    return NextResponse.json({ answer: responseMessage });
  } catch (error: any) {
    console.error("Error in /api/ask-gemini:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }
    return NextResponse.json({ error: "An internal server error occurred.", details: error.message }, { status: 500 });
  }
}
