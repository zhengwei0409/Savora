const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
    },
    occupation:{
        type: String
    },
    income:{
        type: Number
    },
    country:{
        type: String
    },
    gender:{
        type: String
    },
    dateOfBirth:{
        type: Date
    },
    updatedAt:{
        type: Date
    },
    sessionTokens:{
        type:[String]
    },
    profileCompleted:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports=mongoose.model('User',userSchema)