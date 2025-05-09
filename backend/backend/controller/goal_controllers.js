const mongoose=require('mongoose')
const Goal=require('../models/goal_models')

const getGoals=async(req,res)=>{
    const goals=await Goal.find({}).sort({createdAt:-1})

    res.status(200).json(goals)
}
const getGoalsByUser=async(req,res)=>{
    const {userId}= req.params
       
    const goals=await Goal.find({userId }).populate('userId').sort({createdAt:-1})
    if(!goals){
        return res.status(404).json({error:'No such goal'})
    }
    res.status(200).json(goals)
}
const createGoal=async(req,res)=>{
    const{
        userId,
        goalName,
        goalType,
        goalPriority,
        goalCategory,
        targetAmount
    }=req.body
    try{
        const goal= await Goal.create({userId,goalName,goalType,goalPriority,goalCategory,targetAmount})
        res.status(200).json(goal)
    }catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteGoalByUser=async(req,res)=>{
    const {userId}=req.params
    const goal =await Goal.deleteMany({userId})
    if(!goal){
        return res.status(404).json({error:'No such goal'})
    }
    res.status(200).json(goal)
}
const updateGoal = async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such goal'})
    }

    const goal= await Goal.findOneAndUpdate({_id:id},{...req.body})
    if(!goal){
        return res.status(404).json({error:'No such goal'})
    }
    res.status(200).json(goal)
}

module.exports={
    getGoals,
    getGoalsByUser,
    createGoal,
    deleteGoalByUser,
    updateGoal
}
