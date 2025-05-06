const express=require('express')
const router=express.Router()
const{
    getReminders,
    getRemindersByUser,
    getRemindersByGoal,
    createReminder,
    deleteReminderByGoal,
    updateReminder
}=require('../controller/reminder_controllers')

router.get('/',getReminders)
router.get('/byUser/:userId',getRemindersByUser)
router.get('/byGoal/:goalId',getRemindersByGoal)
router.post('/',createReminder)
router.delete('/:goalId',deleteReminderByGoal)
router.patch('/:id',updateReminder)

module.exports=router