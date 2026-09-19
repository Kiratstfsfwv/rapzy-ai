import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function POST(req: Request) {
  try {
    const { prompt, personality } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ result: "Halo! Ini adalah preview offline RAPZY AI karena GEMINI_API_KEY belum disetel di Vercel. Keren kan tampilannya? Silakan setel API key di Vercel nanti ya!" });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are RAPZY AI, a warm, friendly, cheerful, colorful cartoon assistant.",
        temperature: 0.7,
      }
    });

    return NextResponse.json({ result: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
