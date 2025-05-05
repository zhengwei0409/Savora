// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve static files from public directory

// Initialize Google Gemini client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("ERROR: Gemini API key is missing. Set it in your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas:', err));

// Define Video Schema
const videoSchema = new mongoose.Schema({
  embedUrl: String,
  title: String,
  author: String,
  views: String,
  publishedDate: String,
  description: String
});

// Create Video Model
const Video = mongoose.model('Video', videoSchema);



// Endpoint to analyze investment data
app.post("/api/analyze-investment", async (req, res) => {
  try {
    // Extract data from request body
    const {
      amountInvested,
      amountReturned,
      investmentPeriod,
      investmentType,
      totalGain,
      roi,
      annualReturn
    } = req.body;

    // Input validation
    if (!amountInvested || !amountReturned || !investmentType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Create a prompt for Gemini
    const prompt = createInvestmentAnalysisPrompt({
      amountInvested,
      amountReturned,
      investmentPeriod,
      investmentType,
      totalGain,
      roi,
      annualReturn
    });

    // Generate analysis using Gemini
    const analysis = await generateWithGemini(prompt);

    // Return the analysis
    return res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error("Error analyzing investment:", error);
    return res.status(500).json({
      success: false,
      message: `Error analyzing investment: ${error.message || "Unknown error"}`
    });
  }
});

// API for getting videodb data
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Function to create a prompt for investment analysis
function createInvestmentAnalysisPrompt(investmentData) {
  const {
    amountInvested,
    amountReturned,
    investmentPeriod,
    investmentType,
    totalGain,
    roi,
    annualReturn
  } = investmentData;

  return `As a financial analyst, evaluate this investment:
  
Investment Details:
- Type: ${investmentType}
- Amount invested: MYR ${amountInvested.toFixed(2)}
- Amount returned: MYR ${amountReturned.toFixed(2)}
- Investment period: ${investmentPeriod} year(s)
- Total gain: MYR ${totalGain.toFixed(2)}
- ROI: ${roi.toFixed(2)}%
- Average annual return: ${annualReturn.toFixed(2)}%

Please provide:
1. A brief assessment of this ROI relative to typical returns for ${investmentType}
2. Whether this return is considered good in the current market conditions
3. Recommendations for future investments based on this performance

Keep your analysis concise, practical, educational and in about 50 words.`;
}

// Function to generate content with Gemini
async function generateWithGemini(prompt) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    // Return the text
    return response.text;
    
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`Gemini API error: ${error.message || "Unknown error"}`);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});