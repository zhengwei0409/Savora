const { GoogleGenAI } = require("@google/genai");
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function createPrompt(data) {
  const {
    amountInvested, amountReturned, investmentPeriod,
    investmentType, totalGain, roi, annualReturn,
  } = data;

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

exports.analyzeInvestment = async (req, res) => {
  try {
    const {
      amountInvested, amountReturned, investmentPeriod,
      investmentType, totalGain, roi, annualReturn
    } = req.body;

    if (!amountInvested || !amountReturned || !investmentType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const prompt = createPrompt(req.body);

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return res.json({ success: true, analysis: response.text });
  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({ success: false, message: "Error: " + error.message });
  }
};