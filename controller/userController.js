const { generateToken } = require('../config/jwtToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

//Signup User

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email
  const mobile = req.body.mobile

  const findUserEmail = await User.findOne({ email: email })
  const findUserMobile = await User.findOne({ mobile: mobile })

  console.log('findUser', findUserEmail)
  console.log('findUserMobile', findUserMobile)
  if (findUserEmail) {
    throw new Error('Email already exist !')
  }

  if (findUserMobile) {
    throw new Error('Mobile no already exist !')
  }

  const newUser = await User.create(req.body)
  res.json({
    msg: 'user create successfully!',
    success: true,
    data: newUser
  })
})

//Login User

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //check User Exist or not
  const findUser = await User.findOne({ email: email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id)
    })
  } else {
    throw new Error('Invalid Credentials !')
  }
  console.log(email, password)
})

//Update User

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
  try {
    const updateUser = await User.findOneAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile
      },
      {
        new: true
      }
    )

    res.json(updateUser)
  } catch (err) {
    throw new Error(err)
  }
})

//Get All User

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({})
    res.send(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

//get User Details

const userDetail = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user
    const userDetail = await User.findById(_id)
    res.send(userDetail)
  } catch (err) {
    throw new Error(err)
  }
})

//Delete User

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user
    const deleteUser = await User.findByIdAndDelete(_id)
    res.send(deleteUser)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = {
  createUser,
  loginController,
  getAllUsers,
  userDetail,
  deleteUser,
  updateUser
}
