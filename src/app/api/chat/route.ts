import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({ result: "Halo! Ini adalah preview offline RAPZY AI karena GEMINI_API_KEY belum disetel di Vercel." });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: "You are RAPZY AI, a warm, friendly, cheerful, colorful cartoon assistant."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ result: response.text() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
