require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')


const marketRoutes=require('./routes/market_routes')
const userRoutes=require('./routes/user_routes')
const chatbotRoutes=require('./routes/chatbot_routes')
const goalRoutes=require('./routes/goal_routes')
const reminderRoutes=require('./routes/reminder_routes')
const savingRoutes=require('./routes/saving_routes')
const investmentRoutes = require("./routes/investment_routes");
const videoRoutes = require("./routes/video_routes");

const app=express()

// Middleware
app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


// Routes
app.use('/api/market',marketRoutes)
app.use('/api/user',userRoutes)
app.use('/api/chatbot',chatbotRoutes)
app.use('/api/goal',goalRoutes)
app.use('/api/reminder',reminderRoutes)
app.use('/api/saving',savingRoutes)
app.use("/api/analyze-investment", investmentRoutes);
app.use("/api/videos", videoRoutes);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
  });

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));