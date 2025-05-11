const mongoose=require('mongoose')
const Saving=require('../models/saving_models')

const getSavings=async(req,res)=>{
    const savings=await Saving.find({}).sort({createdAt: -1})

    res.status(200).json(savings)
}
const getSavingsByUser=async(req,res)=>{
    const {userId}= req.params
       
    const savings=await Saving.find({userId}).populate('userId').sort({createdAt:-1})
    if(!savings){
        return res.status(404).json({error:'No such saving'})
    }
    res.status(200).json(savings)
}
const getSavingsByGoal=async(req,res)=>{
    const {goalId}= req.params
       
    const savings=await Saving.find({goalId}).populate('goalId').sort({createdAt:-1})
    if(!savings){
        return res.status(404).json({error:'No such saving'})
    }
    res.status(200).json(savings)
}
const createSaving=async(req,res)=>{
    const{userId,goalId,amount}=req.body
    try{
        const saving= await Saving.create({userId,goalId,amount})
        res.status(200).json(saving)
    }catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteSavingByGoal=async(req,res)=>{
    const {goalId}= req.params

    const saving=await Saving.deleteMany({goalId})
    if(!saving){
        return res.status(404).json({error:'No such saving'})
    }
    res.status(200).json(saving)
}
const updateSaving=async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such saving'})
    }

    const saving= await Saving.findOneAndUpdate({_id:id},{...req.body})
    if(!saving){
        return res.status(404).json({error:'No such saving'})
    }
    res.status(200).json(saving)
}
module.exports={
    getSavings,
    getSavingsByUser,
    getSavingsByGoal,
    createSaving,
    deleteSavingByGoal,
    updateSaving
}