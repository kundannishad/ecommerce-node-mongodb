const User = require('../models/userModel');
const jwt =require('jsonwebtoken');
const asyncHandler =require('express-async-handler');


//Verfiy Jwt Token
const authMiddleWare = asyncHandler(async (req,res,next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token =req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decoded?.id);
            console.log("LasteUser",user)
            req.user = user;
            next();
        } catch(err) {
            throw new Error(err)
        }
    } else {
        throw new Error("There Is no token attache on the header !")
    }
});

//Check Validate Role

const isAdmin = asyncHandler( async (req,res,next) =>{
    const {_id} = req.user;
    console.log(_id);
    const  adminUser = await  User.findById(_id);
    if(adminUser.role == 'admin') {
        throw new Error("You are not an admin !")
    } else {
        next()
    }
});

module.exports = {authMiddleWare,isAdmin}