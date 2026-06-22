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
  category?: string;
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
  
  Language Rule: The main titles/headlines (such as the 'headline' field) must be in English. All other details, descriptions, subheadlines, and body texts (such as the 'subheadline' field) must be in Indonesian.
  
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
          themeColor: { type: Type.STRING, description: "hex color code" },
          category: { type: Type.STRING, description: "business category in Indonesian (e.g. Kuliner, Fashion, Teknologi, Kesehatan, Jasa, Kecantikan, Otomotif, Hobi, dll.)" }
        },
        required: ["headline", "subheadline", "cta", "url", "sections", "themeColor", "category"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};

export interface EditorCopyResult {
  reply: string;
  suggestedData?: {
    headline: string;
    subheadline: string;
    cta: string;
    price?: string;
  };
}

export const generateEditorCopy = async (
  command: string, 
  currentData: { headline: string; subheadline: string; cta: string }
): Promise<EditorCopyResult> => {
  const prompt = `You are an AI Copilot for a micro-landing page CMS. The user has a landing page with the current content context:
  Headline: "${currentData.headline}"
  Subheadline: "${currentData.subheadline}"
  CTA Button: "${currentData.cta}"

  The user gives the command/instruction: "${command}"

  Your job is to generate highly engaging, creative, and relevant copywriting for their landing page based on this command.
  
  ALWAYS output your generated content in these four fields:
  1. "headline": A short, catchy title, product name, or main hook.
  2. "subheadline": The main descriptive text, promo copy, or explanatory paragraph. Ensure it directly answers the user's prompt!
  3. "cta": A short call-to-action button text (max 3 words).
  4. "price": A realistic price formatted in Rupiah (e.g., 'Rp 50.000', 'Gratis') if generating a product/service, otherwise an empty string.

  Make the tone match their request if specified. Provide a friendly reply in Indonesian explaining what you generated.

  Return a JSON object matching this schema:
  {
    "reply": "Penjelasan singkat dalam bahasa Indonesia",
    "suggestedData": {
      "headline": "Judul Menarik",
      "subheadline": "Teks promo atau deskripsi yang relevan dengan instruksi...",
      "cta": "Beli Sekarang",
      "price": "Rp 150.000"
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
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              cta: { type: Type.STRING },
              price: { type: Type.STRING }
            },
            required: ["headline", "subheadline", "cta", "price"]
          }
        },
        required: ["reply", "suggestedData"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};
