const mongoose=require('mongoose')
const Reminder=require('../models/reminder_models')

const getReminders=async(req,res)=>{
    const reminders=await Reminder.find({}).sort({createdAt: -1})

    res.status(200).json(reminders)
}
const getRemindersByUser=async(req,res)=>{
    const {userId}= req.params
       
    const reminders=await Reminder.find({userId}).populate('userId').sort({createdAt:-1})
    if(!reminders){
        return res.status(404).json({error:'No such reminder'})
    }
    res.status(200).json(reminders)
}
const getRemindersByGoal=async(req,res)=>{
    const {goalId}= req.params
       
    const reminders=await Reminder.find({goalId}).populate('goalId').sort({createdAt:-1})
    if(!reminders){
        return res.status(404).json({error:'No such reminder'})
    }
    res.status(200).json(reminders)
}
const createReminder=async(req,res)=>{
    const{userId,goalId}=req.body
    try{
        const reminder= await Reminder.create({userId,goalId})
        res.status(200).json(reminder)
    }catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteReminderByGoal=async(req,res)=>{
    const {goalId}= req.params

    const reminder=await Reminder.deleteMany({goalId})
    if(!reminder){
        return res.status(404).json({error:'No such reminder'})
    }
    res.status(200).json(reminder)
}
const updateReminder=async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such reminder'})
    }

    const reminder= await Reminder.findOneAndUpdate({_id:id},{...req.body})
    if(!reminder){
        return res.status(404).json({error:'No such reminder'})
    }
    res.status(200).json(reminder)
}
module.exports={
    getReminders,
    getRemindersByUser,
    getRemindersByGoal,
    createReminder,
    deleteReminderByGoal,
    updateReminder
}