import { GoogleGenAI } from "@google/genai";

// Initialize the client. API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Tu es le Gardien Virtuel du serveur Minecraft "MineHub" (IP: 209.205.228.237:3104).

INFORMATIONS SERVEUR :
- Hébergement : Godlike.host (Performance élevée).
- Type : Paper MC (Java Edition).
- Version : 1.21.10 (Compatible 1.21.x).
- Accès : Ouvert à tous (Cracks / Offline mode acceptés).
- Disponibilité : 24/7.
- Capacité : 400 joueurs.
- Philosophie : Survie Classique & Fun. Quelques plugins essentiels (protection, tp).

RÈGLES ABSOLUES :
1. Tu dois répondre EXCLUSIVEMENT en FRANÇAIS. Si on te parle dans une autre langue, réponds poliment en français que tu ne parles que cette langue.
2. Ton ton doit être amical, joyeux et accueillant, comme un guide de confiance.
3. Si on te demande l'hébergeur, mentionne fièrement "Godlike".
4. Si on te demande l'IP, donne-la : 209.205.228.237:3104.
`;

export const sendMessageToGemini = async (message: string, history: { role: string, parts: { text: string }[] }[] = []) => {
  try {
    const model = 'gemini-2.5-flash'; 
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history 
    });

    const result = await chat.sendMessage({ message: message });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, mes circuits de redstone surchauffent. Je ne peux pas répondre pour le moment.";
  }
};