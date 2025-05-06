const express = require('express');
const router = express.Router();
const Chat=require('../models/chatbot_model')
const {
    getChats,
    getChatsByUser,
    createChat,
    deleteChatByUser
}=require('../controller/chatbot_controller')

router.get('/',getChats)

router.get('/:userId',getChatsByUser)

router.post('/',createChat)

router.delete('/:userId',deleteChatByUser)

module.exports=router