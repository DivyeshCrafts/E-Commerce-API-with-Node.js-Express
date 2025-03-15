import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {Product} from "../models/product.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import mongoose from "mongoose"

const add = asyncHandler(async (req, res)=>{
    const {title, price, description, stock, category, image} = req.body
    const product = await Product.create({title, price, description, stock, category, image})
    const added_product = await Product.findById(product._id)
    if(!added_product){
        throw new ApiError(500, "Something went wrong while adding product")
    }
    return res.status(201).json(new ApiResponse(200, added_product, "Product added successfully"))
})

const get_products = asyncHandler(async (req, res)=>{

    const page = parseInt(req.page) || 1
    const limit = parseInt(req.limit) || 5
    const skip = (page - 1) * limit

    const all_products = await Product.aggregate([
       {$skip:skip},
       {$limit:limit}
    ])

    if(!all_products.length){
        throw new ApiError(204, "Product not found")
    }

    res.status(201).json(new ApiResponse(200, all_products, "Products list"))
})

const get_one_products = asyncHandler(async (req, res)=>{
    const id = req.params.id
    //validation
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid product id")
    }
 
    const all_products = await Product.findById(id).lean()
    if(!all_products){
        throw new ApiError(204, "Product not found")
    }

    res.status(201).json(new ApiResponse(200, all_products, "Product"))
})

const update_product = asyncHandler(async (req, res)=>{
    const id = req.params.id
    const {title, price, description, stock, category, image} = req.body

    //validation
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid product id")
    }
    const request_body = req.body
 
    const update_product = await Product.findByIdAndUpdate(id,
        {title, price, description, stock, category, image},
        {new:true, runValidators:true})
    if(!update_product){
        throw new ApiError(404, "Product not found")
    }
    res.status(201).json(new ApiResponse(200, update_product, "Product updated successfully"))
})

//delete
const deleteProduct = asyncHandler(async (req, res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid todo id")
    }
    const deletedProduct = await Product.findByIdAndDelete(id).lean()
    if(!deletedProduct){
        throw new ApiError(404, "Product not found")
    }
    return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"))
})

export {add, get_products, get_one_products, update_product, deleteProduct}