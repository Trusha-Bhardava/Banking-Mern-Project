import { useState } from "react";
import "./ResumeAnalyzer.css";
import ReactMarkdown from "react-markdown";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // This function runs when the button is clicked
  async function handleAnalyze() {
    // Check whether the user entered resume text
    if (!resumeText.trim()) {
      setError("Please enter your resume text.");
      setAnalysis("");
      return;
    }

    // Start loading and clear previous messages
    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      // Send the resume to the backend
      const response = await fetch(
        "http://localhost:8000/api/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeText: resumeText,
          }),
        }
      );

      // Convert the backend response into JSON
      const data = await response.json();

      // Display any error returned by the backend
      if (!response.ok) {
        throw new Error(
          data.message || "Resume analysis failed."
        );
      }

      // Display the AI-generated analysis
      setAnalysis(data.analysis);

    } catch (error) {
      console.error("Resume analysis error:", error.message);
      setError(
        error.message || "Could not connect to the backend."
      );

    } finally {
      // Stop loading whether the request succeeds or fails
      setLoading(false);
    }
  }

  // This JSX displays the page
  return (
    <div className="resume-page">
      <div className="resume-card">
        <h1>AI Resume Analyzer</h1>

        <p>
          Get AI-powered feedback to improve your resume.
        </p>

        <label htmlFor="resumeText">
          Paste your resume text
        </label>

        <textarea
          id="resumeText"
          value={resumeText}
          onChange={(event) =>
            setResumeText(event.target.value)
          }
          placeholder="Enter your skills, education, projects and experience..."
          rows={10}
        />

        {error && (
          <p className="resume-error">{error}</p>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

       
          {analysis && (
            <div className="resume-result">
              <h2>Resume Analysis Report</h2>

              <div className="resume-result-content">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}

export default ResumeAnalyzer;
