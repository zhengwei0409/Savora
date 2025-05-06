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

const app=express()

app.use(cors())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/market',marketRoutes)
app.use('/api/user',userRoutes)
app.use('/api/chatbot',chatbotRoutes)
app.use('/api/goal',goalRoutes)
app.use('/api/reminder',reminderRoutes)
app.use('/api/saving',savingRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('connect to db and running on port',process.env.PORT )
        })
    })
    .catch((error)=>{
        console.log(error)
    })