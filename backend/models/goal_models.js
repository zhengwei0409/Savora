const mongoose=require('mongoose')
const Schema=mongoose.Schema

const goalSchema=new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    goalName:{
        type:String,
        required: true
    },
    goalType:{
        type:String,
        required: true
    },
    goalPriority:{
        type:String,
        required: true
    },
    goalCategory:{
        type:String,
        required: true
    },
    targetAmount:{
        type: Number,
        required: true
    },
    startDate:{
        type: Date
    },
    endDate:{
        type:Date
    },
    savingDuration:{
        years:{
            type:Number,
            default:0
        },
        months:{
            type:Number,
            default:0
        }
    },
    amountSaved:{
        type:Number
    },
    strategy:String,
    updatedAt:Date
},{timestamps:true})

module.exports=mongoose.model('Goal',goalSchema)