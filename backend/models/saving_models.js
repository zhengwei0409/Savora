const mongoose=require('mongoose')
const Schema=mongoose.Schema

const savingSchema=new Schema({
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
    amount:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports=mongoose.model('Saving',savingSchema)