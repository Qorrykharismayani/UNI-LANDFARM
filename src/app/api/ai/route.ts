import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "openai-t2-sg",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      result: response.choices[0]?.message?.content,
    });
  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Terjadi error pada AI route",
      },
      { status: 500 }
    );
  }
}