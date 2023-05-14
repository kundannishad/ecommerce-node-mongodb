const express = require('express');
const router = express.Router();
const {createUser,loginController,getAllUsers,userDetail,deleteUser,updateUser} = require('../controller/userController');

const {authMiddleWare,isAdmin} = require('../middlewares/authMiddleware');

router.post('/register',createUser);
router.post('/login',loginController);
router.get('/getAllUsers',getAllUsers);
router.get('/userDetail',authMiddleWare,isAdmin,userDetail);
router.delete('/delete-user/:id',authMiddleWare,deleteUser);
router.put('/update-user/:id',authMiddleWare,updateUser);





module.exports =router; 