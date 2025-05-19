const captaincontroller = require('../controller/captain.controller')
const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const authmiddleware=require('../middlewares/auth.middleware')
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a atleast 1'),   
], 
captaincontroller.registerCaptain  
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
captaincontroller.loginCaptain
)

router.get('/profile',authmiddleware.authCaptain,captaincontroller.getCaptainProfile)

router.get('/logout',authmiddleware.authCaptain,captaincontroller.logoutCaptain)
module.exports = router;