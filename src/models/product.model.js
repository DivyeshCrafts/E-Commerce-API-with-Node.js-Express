import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    title:{type:String, trim:true, required:true, index:true, lowecase:true},
    price:{type:Number, trim:true, required:true},
    description:{type:String, trim:true, lowecase:true, default:""},
    stock:{type:Number, trim:true, required:true},
    category:{type:String, trim:true, required:true, lowecase:true},
    image:{type:String, default:""},
}, {timestamps:true})

export const Product = mongoose.model("Product", productSchema)