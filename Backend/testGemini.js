
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

// Check if the developer forgot to put the API key in the .env file
if (!apiKey) 
  {
  console.log('Error: GEMINI_API_KEY was not found in .env');
} 
else 
{
  //  Initialize the official Google Gen AI client with the valid API key
  const ai = new GoogleGenAI({ apiKey });

  (async () => {

  // AI Call: Ask the Google Gemini model to process our text prompt instructions
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Explain artificial intelligence in 2 simple sentences.'
    });

    // Output the smart generated answer onto the terminal console
    console.log('Gemini response:');
    console.log(response.text);

  } 
  catch (error) 
  {
    console.error('Gemini API request failed:', error.message);
  }
})
();

}
