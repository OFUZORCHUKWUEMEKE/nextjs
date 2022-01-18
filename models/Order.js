import Mongoose from 'mongoose';

const OrderSchema = new Mongoose.Schema({
    customer:{
        type:String,
        required:true,
        maxLength:60
    },
    address:{
        type:String,
        required:true,
        maxLength:200
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        default:0
    },
    method:{
        type:Number,
        required:true
    }
    
},{timeStamps:true})

export default Mongoose.models.Order  || Mongoose.model("Order",OrderSchema)
