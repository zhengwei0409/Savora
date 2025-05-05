const express=require('express')
const router=express.Router()
const{
    getGoals,
    getGoalsByUser,
    createGoal,
    deleteGoalByUser,
    updateGoal
}=require('../controller/goal_controllers')

router.get('/',getGoals)

router.get('/:userId',getGoalsByUser)

router.post('/',createGoal)

router.delete('/:userId',deleteGoalByUser)

router.patch('/:id',updateGoal)

module.exports=router