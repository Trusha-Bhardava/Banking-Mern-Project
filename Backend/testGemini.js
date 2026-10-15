
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.log('Error: GEMINI_API_KEY was not found in .env');
} else {
  const ai = new GoogleGenAI({ apiKey });

  (async () => {

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Explain artificial intelligence in 2 simple sentences.'
    });

    console.log('Gemini response:');
    console.log(response.text);
  } catch (error) {
    console.error('Gemini API request failed:', error.message);
  }
})();
}
