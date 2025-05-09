const Chat=require('../models/chatbot_model')

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

module.exports={
    getChats,
    getChatsByUser,
    createChat,
    deleteChatByUser
}
