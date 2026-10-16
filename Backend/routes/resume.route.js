import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

//  Fetch the API key from your environment variables (.env file)
const apiKey = process.env.GEMINI_API_KEY;

//  Initialize the Gemini client only if the API key exists, otherwise keep it null
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// POST /api/resume/analyze
// Receives the text from the frontend, sends it to Gemini AI, and returns the feedback.
router.post("/analyze", async (req, res) => {
  try {
    const { resumeText } = req.body;

    // Check whether resume text was provided
    // Stop immediately if the user sends empty text or spaces
    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        message: "Please enter your resume text."
      });
    }

    // Check whether the Gemini API key exists
    // Stop if the developer forgot to set the API key in the .env file
    if (!ai) {
      return res.status(500).json({
        message: "Gemini API key is missing."
      });
    }

    // Ask Gemini to analyze the resume
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `
        Analyze the following resume for a fresher software developer.

        Give feedback in these sections:
        1. Resume strengths
        2. Skills that are missing or unclear
        3. Suggestions for improvement
        4. Recommended projects or skills to learn

        Keep the language simple and beginner-friendly.
        Do not invent qualifications or experience.

        Resume:
        ${resumeText}
      `
    });

    // Send the AI result to the frontend
    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: response.text
    });

 
} catch (error) {
  console.error("Resume analysis failed:", error.message);

  const errorMessage = error.message || "";

  // If Google's AI servers are down or overloaded (503), tell the user gently
  if (
    errorMessage.includes("503") ||
    errorMessage.includes("UNAVAILABLE")
  ) {
    return res.status(503).json({
      message: "AI service is busy. Please try again in a minute."
    });
  }

  return res.status(500).json({
    message: "Unable to analyze the resume. Please try again."
  });
}
});

export default router;
