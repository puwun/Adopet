const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
// const Dog = require('../models/pets/dog');
// const Cat = require('../models/pets/cat');
// const Bird = require('../models/pets/bird');
// const Smallandfurry = require('../models/pets/saf');
// const Other = require('../models/pets/other');
const passport = require('passport');
const {storeReturnTo, isAdmin, requireLogin, validateUser,isLoggedIn} = require('../middleware');
const multer = require('multer')
const {storage} = require('../cloudinary/index')
const upload = multer({dest: storage})
const fileUpload = require('express-fileupload')
// const sendMail = require('../controllers/sendMail')
const user = require('../controllers/user');


router.use(fileUpload({
    useTempFiles:true,
}))


router.get('/', (req, res) => {
    res.render('home');
    // res.send('THIS IS HOME PAGE text');
    // res.render('/map/index.html');
})

router.get('/events' , user.renderEvents)


router.get('/signup', user.renderSignup)    

//when users register or signup their info is saved in the db but they are required to login again which is kinda clunky so like logout passport provides a method called login() too which takes a user and logs them in and this too requires a callback same as logout does
router.post('/signup', validateUser, catchAsync(user.signup))


router.get('/login', user.renderLogin)

// using the storeReturnTo middleware to save the returnTo value from session to res.locals brfore passport.authenticate() middleware runs because passport.authenticate logs the user in and clears req.session
router.post('/login', 
    storeReturnTo, 
    passport.authenticate('local', { failureFlash : true, failureRedirect: '/login' }), 
    user.login)

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


router.get('/logout', user.logout)


router.get('/user/profile', catchAsync(user.renderProfile))


router.get('/feedback', isLoggedIn, user.renderFeedback)


router.post('/feedback', isLoggedIn,catchAsync(user.sendFeedback))


router.get('/faq', user.renderFaq)


router.get('/donate', isLoggedIn, user.renderDonate)


router.post('/donate',isLoggedIn , catchAsync(user.donate))

module.exports = router;
