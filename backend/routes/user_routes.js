const express = require('express');
const router = express.Router();

const {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}=require ('../controller/user_controller')

//GET all users
router.get('/',getUsers)

router.get('/:id',getUser)

router.post('/',createUser)

router.delete('/:id',deleteUser)

router.patch('/:id',updateUser)

module.exports=router