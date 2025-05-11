const express = require('express');
const router = express.Router();

// below code controller handles it already
// const Chat=require('../models/chatbot_model')

const {
    getChats,
    getChatsByUser,
    createChat,
    deleteChatByUser,
    handleUserMessage,
}=require('../controller/chatbot_controller')

router.get('/',getChats)

router.get('/:userId',getChatsByUser)

router.delete('/:userId',deleteChatByUser)

router.post('/ask', handleUserMessage);

// direct way to create chat entries without AI (e.g., for testing)
router.post('/',createChat)

module.exports=router