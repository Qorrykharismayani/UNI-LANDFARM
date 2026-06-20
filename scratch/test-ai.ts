import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ 
  apiKey: (process.env.GEMINI_API_KEY as string) 
});

const generateEditorCopy = async (
  command: string, 
  currentData: { headline: string; subheadline: string; cta: string }
) => {
  const prompt = `You are an AI Copilot for a micro-landing page CMS. The user has a landing page with the current hero content:
  Headline: "${currentData.headline}"
  Subheadline: "${currentData.subheadline}"
  CTA Button: "${currentData.cta}"

  The user gives the command/instruction: "${command}"

  Your job is to process this instruction. If the user wants to generate, write, rewrite, or update copy for any section of their landing page (e.g. Hero Section, About Section, Products/Services, Keunggulan, or CTA):
  1. Determine the target section: "hero", "about", "products", or "cta".
  2. Generate the appropriate fields for that section:
     - For "hero": headline, subheadline, cta
     - For "about": description, profile, story
     - For "products": name, description, price
     - For "cta": title, description, buttonText
  3. Provide a friendly, helpful reply explaining what you generated and how it benefits them. Keep the reply in Indonesian.

  Return a JSON object matching this schema:
  {
    "reply": "Friendly explanation of changes in Indonesian",
    "suggestedData": {
      "section": "hero | about | products | cta",
      "fields": {
         "fieldName1": "value1",
         "fieldName2": "value2"
      }
    }
  }`;

  console.log('Sending prompt...');
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING },
          suggestedData: {
            type: Type.OBJECT,
            properties: {
              section: { type: Type.STRING },
              fields: {
                type: Type.OBJECT,
                additionalProperties: { type: Type.STRING }
              }
            },
            required: ["section", "fields"]
          }
        },
        required: ["reply"]
      }
    }
  });

  console.log('Response:', response.text);
};

generateEditorCopy("Buat promo diskon 30% menyambut liburan sekolah untuk produk kopi robusta", {
  headline: "Kopi Enak",
  subheadline: "Kopi paling mantap di kota",
  cta: "Beli"
}).catch(console.error);
