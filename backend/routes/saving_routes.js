const express=require('express')
const router=express.Router()
const{
    getSavings,
    getSavingsByUser,
    getSavingsByGoal,
    createSaving,
    deleteSavingByGoal,
    updateSaving
}=require('../controller/saving_controllers')

router.get('/',getSavings)
router.get('/byUser/:userId',getSavingsByUser)
router.get('/byGoal/:goalId',getSavingsByGoal)
router.post('/',createSaving)
router.delete('/:goalId',deleteSavingByGoal)
router.patch('/:id',updateSaving)

module.exports=router