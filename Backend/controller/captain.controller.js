const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle, location } = req.body;

        // Check if captain already exists
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Hash password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create captain using service
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            lat: location.lat,
            lng: location.lng
        });

        // Generate token
        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        console.error('Register Captain Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    // const isMatch = await captainModel.comparePassword(password, captain.password);
    // if (!isMatch) {
    //     return res.status(400).json({ message: 'Invalid email or password' });
    // }
    //const token = captain.generateAuthToken();

    // Set token in cookie
    // res.cookie('token', token, {
    //     httpOnly: true,           // Secure: JS can't access it
    //     secure: process.env.NODE_ENV === 'production', // true in production
    //     sameSite: 'Strict',       // Adjust if doing cross-site requests
    //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    // });
    
    // res.status(200).json({ token, captain });
    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}

