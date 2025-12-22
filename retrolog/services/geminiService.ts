
import { GoogleGenAI, Type } from "@google/genai";

// Always use the process.env.API_KEY directly as per the guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function polishPost(text: string, type: 'echo' | 'chronicle') {
  if (!process.env.API_KEY) return text;

  const systemInstruction = type === 'echo' 
    ? "你是一位极简主义微型博客博主。请将提供的文本润色为一段简短、富有诗意且有意义的更新（尽量在140字以内）。保持一种复古、深思熟虑的语调。"
    : "你是一位资深散文家和设计师。请将提供的文本润色为一篇专业且温润的博客文章。语言要优雅，专注于高质量的设计哲学和人文思考。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    // Use the .text property to access the generated text from the response object
    return response.text || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
}

export async function generateSummary(content: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `请为以下文章写一段简短的摘要（两句话以内），作为引人入胜的内容预览：\n\n${content}`,
    });
    // Use the .text property to access the generated text from the response object
    return response.text || "";
  } catch (error) {
    return "";
  }
}
