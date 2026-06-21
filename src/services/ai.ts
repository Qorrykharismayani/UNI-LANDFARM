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
  const response = await fetch('/api/ai/generate-draft', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      businessName,
      category,
      description,
      templateName,
    }),
  });

  const result = await response.json();
  
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Gagal menghasilkan draf situs dari server.');
  }

  return result.data;
};

export interface EditorCopyResult {
  reply: string;
  suggestedData?: {
    headline: string;
    subheadline: string;
    cta: string;
  };
}

export const generateEditorCopy = async (
  command: string, 
  currentData: { headline: string; subheadline: string; cta: string }
): Promise<EditorCopyResult> => {
  const response = await fetch('/api/ai/editor-copy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      command,
      currentData,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Gagal menghasilkan teks draf dari server.');
  }

  return result.data;
};
