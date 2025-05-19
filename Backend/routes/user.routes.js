const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controller/user.controller');
const userModel = require('../models/user.model');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], 
userController.registerUser
)
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
userController.loginUser
)
router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports = router;
