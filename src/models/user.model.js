import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new Schema({
    username:{type:String, trim:true, required:true, index:true, lowercase: true},
    fullname:{type:String, trim:true, required:true},
    email:{type:String, trim:true, required:true, index:true, lowercase: true},
    password:{type:String, required:true},
    role:{type:String, enum:["user", "admin"]},
    city:{type:String, trim:true, lowercase:true},
    refreshToken:{type:String}
}, {timestamps:true})

//password hashing
UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//password check
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

//generate access token
UserSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id:this._id,
        username: this.username,
        fullname: this.fullname,
        email:this.email,
        role:this.role
    }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

//generate refresh token
UserSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", UserSchema)