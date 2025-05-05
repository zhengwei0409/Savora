const mongoose=require('mongoose')
const Schema=mongoose.Schema

const chatbotSchema=new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    response:{
        type: String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Chatbot',chatbotSchema)