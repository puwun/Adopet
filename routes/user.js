const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
<<<<<<< Updated upstream
=======
const {storeReturnTo} = require('../middleware');
>>>>>>> Stashed changes
// const {current}

const validateUser = (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string()
            // .min(8) 
            .required(),
        email: Joi.string().required(),
        phone: Joi.string()
            // .pattern(new RegExp('/^[0-9]{10}$/'))
            .required()
            .messages({ 'string.pattern.base': 'Invalid phone number. Please provide a 10-digit number.', }),
    }).required()
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        // console.log(error);
        // console.log('----------------------');
        // console.log(msg);
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.render('/login');
    }
}


router.get('/signup', (req, res) => {
    res.render('signup')
})

//when users register or signup their info is saved in the db but they are required to login again which is kinda clunky so like logout passport provides a method called login() too which takes a user and logs them in and this too requires a callback same as logout does
router.post('/signup', validateUser, catchAsync(async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;
        const user = new User({ username, email, phone });
        const registeredUser = await User.register(user, password); //register() automatically saves the user, we don't need to execute newUser.save() to save it to database.
        req.login(registeredUser, err =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Adopet!');
            res.redirect('/');
    })
        // console.log(registeredUser);
        // await user.save();
        // req.session.user_id = user._id;
        // res.json({ success: true, user });
    } catch (e) {
        // console.log(e.message);
        req.flash('error', e.message);
        res.redirect('signup');

        // res.send('error', e.message);
    }
}
))

router.get('/login', (req, res) => {
    // res.send('THIS IS LOGIN PAGE');
    res.render('../views/login');
})

// using the storeReturnTo middleware to save the returnTo value from session to res.locals brfore passport.authenticate() middleware runs because passport.authenticate logs the user in and clears req.session
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash : true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    // console.log(req.body.role)
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl);
    // console.log(req.user);
    // console.log(req.flash('error'));
    // res.redirect('/');

})


// router.post('/login',catchAsync(async (req, res) => {
//     // res.send(req.body);
//     // res.render('login');
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (validPassword) {
//         res.send('welcome back');
//     } else {
//         res.redirect('/login');
//     }

// }))


router.get('/logout', (req, res) => {
    // req.session.user_id = null;
    // req.session.destroy();    //if we store more of users info then this is better   //not required in passport
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
})


router.get('/user/profile',  catchAsync(async(req, res) => {
    // res.send('THIS IS PROFILE PAGE');
    // let users = await User.findById({cuurentUser._id});
    // let users = await User.findById(req.user._id);
    // const user = await User.findById(req.session.user.id);
    const user = await User.findById(req.session.user_id);
    // console.log(user);
    // console.log('----------------------');
    // console.log(req.user);
    const currUser = req.user;
    console.log('----------------------');
    console.log(currUser);
    res.render('../views/profile', {currUser});
}))


// router.get('/signup', (req, res)=> {
//     res.render('../views/signup')
// })

// router.post('/signup', validateUser,catchAsync(async (req, res) => {
//     const { username, password, email, phone } = req.body;
//     const user = new User({ username, password, email, phone });
//     await user.save();
//     res.json({ success: true, user });
// }
// ))



module.exports = router;