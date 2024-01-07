const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');




router.get('/', (req, res)=> {
    res.render('../views/signup')
})

router.post('/', catchAsync(async (req, res) => {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    res.json({ success: true, user });
}
))

module.exports = router;