import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
app.use(express.json());

// Initialize GoogleGenAI SDK with user agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// UPSC AI Mentor Chat Endpoint with Search Grounding
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, useSearch = true, persona = 'mentor' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Convert messages to Gemini contents format
    const contents = messages.map((m: { role: 'user' | 'assistant'; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const systemInstruction = `You are "Drishti IAS AI Mentor", a distinguished, empathetic, and academically rigorous UPSC Civil Services Examination (CSE) mentor and General Studies specialist.
Your expertise spans:
1. UPSC Prelims Paper 1 (Polity, History, Geography, Economy, Environment, Science & Tech) and Paper 2 CSAT.
2. NCERT Foundation (Class 6-12 History, Geography, Polity, Science, Economics).
3. State PSCs (Bihar BPSC, Madhya Pradesh MPPSC, Uttar Pradesh UPPSC).
4. Current Affairs mapping to GS-1, GS-2, and GS-3 with standard source citations (The Hindu, Indian Express, PIB, Yojana, DownToEarth).
5. Prelims MCQ strategy: 50:50 elimination technique, extreme words identification ("only", "all", "drastically"), and handling negative marking (-0.66 penalty).

When explaining concepts or questions:
- Be clear, structured, and bullet-pointed.
- Cite authoritative standard references (e.g., M. Laxmikanth, NCERT Class XI Indian Constitution at Work, Majid Husain, Ramesh Singh).
- Keep answers encouraging, intellectually stimulating, and free of unnecessary fluff.
- If Google Search grounding is used, weave in verified contemporary developments, Supreme Court judgments, and budget/economic survey data smoothly.`;

    const config: any = {
      systemInstruction,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config,
    });

    const replyText = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Web Reference',
        uri: chunk.web.uri || '',
      }));

    res.json({
      reply: replyText,
      sources: webSources,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to communicate with AI Mentor. Verify your API key.',
    });
  }
});

// Quick question explanation endpoint with search grounding
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { questionText, options, correctOption, userOption } = req.body;

    const prompt = `Explain this UPSC Civil Services Prelims Question concisely:
Question: ${questionText}
Options: ${JSON.stringify(options)}
Correct Option: ${correctOption}
Candidate's Selected Option: ${userOption || 'Unattempted'}

Provide:
1. Direct Explanation: Why (${correctOption}) is unequivocally correct.
2. Elimination Logic: Why the other options are wrong or common traps set by the examiner.
3. Standard Book Source & Reference.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const reply = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri,
      }));

    res.json({ explanation: reply, sources });
  } catch (error: any) {
    console.error('Explanation Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate explanation' });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
