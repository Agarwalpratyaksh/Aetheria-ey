import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });

export interface ResearchResponse {
  summary: string;
  keyFindings: string[];
  suggestedNextSteps: string[];
}

export const runAgentSimulation = async (query: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `
      You are Aetheria, an autonomous medical research agent. 
      Your goal is to demonstrate your capability to synthesize complex medical data.
      
      Input: A user query about a medical topic or clinical trial phase.
      
      Output: A concise, professional, and structured response simulating a high-level executive summary.
      Use Markdown formatting.
      Focus on:
      1. Immediate synthesis of the topic.
      2. Identification of 2-3 key patterns or anomalies.
      3. A strategic recommendation for the researcher.
      
      Tone: Scientific, precise, authoritative, yet helpful.
      Keep it under 150 words.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for factual consistency
      }
    });

    return response.text || "Unable to generate research data at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Agent connection offline. Please check API configuration.";
  }
};