import { User } from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {generateaccessAndrefreshToken} from "../utils/token.js"

const registration = asyncHandler(async (req, res)=>{
    const {username, fullname, email, password, role, city} = req.body

    const existUser = await User.findOne({$or:[{username},{email}]}).lean()
    if(existUser){
        throw new ApiError(409, "User already with username and email")
    }
    const user = await User.create({username, fullname, email, password, role, city})
    const createdUser = await User.findById(user._id).lean()
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registeration a user")
    }
    return res.status(201).json(new ApiResponse(200, createdUser, "User registed suucessfully"))
})

const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body

    //validation
    if([email, password].some((field)=>{field.trim() === ""})){
        throw new ApiError(400, "email and password required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404, "user not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credential")
    }

    const {accessToken, refreshToken} = await generateaccessAndrefreshToken(user._id)
    const loggedUser = await User.findById(user._id).select("-refreshToken ").lean()

    if(!loggedUser){
        throw new ApiError(404, "Logged user not found")
    }
    const option ={
        httpOnly:true,
        secure: process.env.NODE_ENV == "production"
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, loggedUser, "User logged successfully"))
})

const logout = asyncHandler(async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.user._id, {$set:{refreshToken:""}}, {new:true})
    const option = {
        httpOnly:true,
        secure: process.env.NODE_ENV == "production"
    }
    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "user logged out successfullfully"))
})

export {registration, login, logout}