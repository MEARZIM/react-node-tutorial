const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/User');
const authentication = require('../middleware/authentication');
const generateOtp = require('../helpers/generateOtp');
const sendMail = require('../libs/mail');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }


    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(200).json({
            message: 'User Created successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    if (!password) {
        return res.status(400).send('Password is required');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                message: 'User does not exists'
            });
        }

        const isValid = await bcrypt.compare(password, existingUser.password);

        if (!isValid) {
            return res.status(400).json({
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign({
            _id: existingUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        // console.log(token);

        return res.status(200).json({
            message: 'User Logged in successfully',
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})

router.get('/profile', authentication, async (req, res) => {

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({
                message: 'User does not exists'
            });
        }

        return res.status(200).json({
            message: 'User Profile was successfully retrieved',
            userData: user
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }


})


// In-Memory Store for OTP (Use Redis or another database instead for production)
const otpStore = {};

router.post('/generate-otp', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {   
        
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: 'User does not exists'
            });
        }

        const otp = generateOtp();
        const expiresIn = Date.now() + 1000 * 30 ; // OTP expires in 30 Seconds

        // Store the otp and expires in
        otpStore[email] = {
            otp,
            expiresIn
        };

        // send mail
        await sendMail(email, otp);

        return res.status(200).json({ message: ' otp :' + otp})
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;