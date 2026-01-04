import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    أنت خبير استراتيجي في تقنيات المتاحف الرقمية. 
    تتمحور فلسفتك حول "النموذج اللغوي الموحد" (Unified Local Model).
    أنت تشجع المتاحف على تدريب نماذج محلية (مثل Llama 3 أو Phi-3) خصيصاً للمهام المتحفية (مثل تحليل الأرشيف، الرد على الزوار، والتدقيق التاريخي).
    تحدث باللغة العربية بأسلوب يجمع بين الدقة التقنية والذوق الثقافي.
    دافع عن مزايا التشغيل المحلي: الخصوصية، السرعة، وعدم الاعتماد على الإنترنت.
    عندما يسأل المستخدم عن "النموذج الموحد"، اشرح له كيف أن "التدريب المتخصص" (Fine-tuning) هو مفتاح النجاح.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "عذراً، لم أستطع توليد رد في الوقت الحالي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء الاتصال بالخبير الرقمي. يرجى المحاولة مرة أخرى.";
  }
};