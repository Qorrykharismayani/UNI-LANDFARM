import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: (process.env.GEMINI_API_KEY as string) 
});

export interface GeneratedWebsiteDraft {
  headline: string;
  subheadline: string;
  cta: string;
  url: string;
  sections: string[];
  themeColor: string;
}

export const generateWebsiteDraft = async (
  businessName: string, 
  category: string, 
  description: string,
  templateName: string = 'Modern Dark Pro (Recommended)'
): Promise<GeneratedWebsiteDraft> => {
  const prompt = `Generate a modern landing page draft for a business.
  Business Name: ${businessName}
  Category: ${category}
  Description: ${description}
  Template Theme: ${templateName}
  
  Return a professional and creative plan in JSON. Ensure the headlines, subheadlines, and theme color perfectly match the aesthetics of the chosen template theme (e.g. dark and neon tones for Modern Dark, clean and bright for Light Agency, warm earth and neutral tones for Minimalist, bold high-contrast for Bold Storefront).`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          cta: { type: Type.STRING },
          url: { type: Type.STRING },
          sections: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          themeColor: { type: Type.STRING, description: "hex color code" }
        },
        required: ["headline", "subheadline", "cta", "url", "sections", "themeColor"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};

export interface EditorCopyResult {
  reply: string;
  suggestedData?: {
    section: string;
    fields: Record<string, string>;
  };
}

export const generateEditorCopy = async (
  command: string, 
  currentData: { headline: string; subheadline: string; cta: string }
): Promise<EditorCopyResult> => {
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

  const result = JSON.parse(response.text);
  return result;
};
