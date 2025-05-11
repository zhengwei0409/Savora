const Chat=require('../models/chatbot_model')
const OpenAI = require('openai'); // Import OpenAI

// Initialize OpenAI client
// Ensure OPENAI_API_KEY is loaded from .env
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getChats=async(req,res)=>{
    const chat=await Chat.find({}).sort({createdAt: -1})
    
    res.status(200).json(chat)
}
const getChatsByUser=async(req,res)=>{
    const {userId}= req.params
    
    const chat=await Chat.find({ userId });
    if(!chat){
        return res.status(404).json({error:'No such chat'})
    }
    res.status(200).json(chat)
}

// for manually adding chats (e.g., for testing)
const createChat=async(req,res)=>{
    const{userId,question,response}=req.body
    try{
        const chat= await Chat.create({userId,question,response})
        res.status(200).json(chat)
    }catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteChatByUser=async(req,res)=>{
    const {userId}=req.params
    const chat =await Chat.deleteMany({userId})
    if(!chat){
        return res.status(404).json({error:'No such chat'})
    }
    res.status(200).json(chat)
}

const handleUserMessage = async (req, res) => {
    const { userId, question } = req.body;

    if (!userId || !question) {
        return res.status(400).json({ error: 'userId and question are required' });
    }

    try {
        // --- Optional: Fetch recent chat history for context ---
        const recentChats = await Chat.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5); // Get last 5 exchanges

        //System Prompt
        const messages = [
            {
                role: 'system',
                content: `You are a helpful personal financial planning assistant named Sori. Provide concise and accurate financial advice. 
                        If you don\'t know the answer, say so. Do not make up information.
                        Do not answer questions that are not relevant to financial, instead you can politely reject
                        Always prioritize user privacy and avoid sharing sensitive information. 
                        Use simple language that is easy to understand. 
                        Use emoji to make your response more attractive
                        Provide examples when necessary to clarify your advice.
                        If user asked, you may tell them this website is a Financial Goal Planning System, designed to help users manage and achieve their financial goals through strategic planning, market insights, and educational tools.
                            This website has Goal-Based Financial Planning where user can set, update, and track short- and long-term financial goals.
                            This website has Personalized Strategy Recommendation, which is basic investment suggestions based on income and goal types.
                            This website has Market Insights & News, where user can access curated market news and nearby investment-related events.
                            This website has Investment Tools, which are Calculators for compound interest and ROI comparison.
                            This website has Educational Content, user can browse curated books and videos on finance and investing.
                            Finally is you who answers common queries about financial planning.
                        You should include a proper disclaimer when a user asks about investment advice
                        Structure your response into paragraphs when it is long so that it is easier to read`
            },
        ];

        // Add recent history to messages array for context
        // OpenAI expects messages in chronological order (oldest to newest)
        for (let i = recentChats.length - 1; i >= 0; i--) {
            messages.push({ role: 'user', content: recentChats[i].question });
            messages.push({ role: 'assistant', content: recentChats[i].response });
        }
        // Add the current user question
        messages.push({ role: 'user', content: question });
        // --- End of Optional Context Fetching ---

        // --- Call OpenAI API ---
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages, // Use the constructed messages array
            temperature: 0.7, // Controls randomness: Lower is more deterministic
            max_tokens: 1000, // Limit response length
        });

        const aiResponse = completion.choices[0].message.content.trim();
        // --- End of OpenAI API Call ---

        // Save the new interaction to the database
        const chat = await Chat.create({ userId, question, response: aiResponse });

        res.status(200).json({
            _id: chat._id, // Send back the ID of the created chat
            userId: chat.userId,
            question: chat.question,
            response: aiResponse,
            createdAt: chat.createdAt
        });

    } catch (error) {
        console.error('Error interacting with AI or database:', error);
        let errorMessage = 'Failed to get response from AI.';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error.message; // OpenAI specific error
        } else if (error.message) {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage });
    }
};

module.exports={
    getChats,
    getChatsByUser,
    createChat,
    deleteChatByUser,
    handleUserMessage,
};
