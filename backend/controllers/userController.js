import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"


const authUser = expressAsyncHandler(async (req, res) =>{

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password) )){
        generateToken(res, user._id)
        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid username and password')
    }
})
 
const registerUser = expressAsyncHandler(async(req, res)=>{

    const { name, email, password } = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user && (await user.matchPassword(password) )){
        generateToken(res, user._id)

        res.status(201).json(user)
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// logout  
const logOutUser = expressAsyncHandler(async(req, res)=>{

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message : 'User Logged out!'})

})

// get user profile
// route GET /API/USERS/PROFILE
const getUserProfile = expressAsyncHandler(async(req, res)=>{
    res.status(200).json({
        message: 'get user profile'
    })
})

// update user profile 
// Route PUT /API/USERS/PROFILE 

const updateUserProfile = expressAsyncHandler( async(req, res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name ? req.body.name : user.name 
        user.email = req.body.email ? req.body.email : user.email
        user.password = req.body.password ? req.body.password : user.password

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    }else{
        res.status(400)
        throw new Error(' User not found ')
    }

})


export { authUser, registerUser, logOutUser, getUserProfile, updateUserProfile  }