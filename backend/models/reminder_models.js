const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reminderSchema=new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    goalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Goal',
        required: true
    },
    frequency:{
        type: String,
        default:'monthly'
    },
    emailSent:{
        type: Boolean,
        default: false
    },
    nextReminderDate:Date
},{timestamps:true})

module.exports=mongoose.model('Reminder',reminderSchema)