const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    if (!password) {
        return res.status(400).send('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    res.send(hashedPassword);
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