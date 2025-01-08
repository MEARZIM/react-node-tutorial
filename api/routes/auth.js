const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

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

    const hashedPassword = await bcrypt.hash(password, 10);

    res.send("signed in");
})

module.exports = router;