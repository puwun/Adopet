const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');
const passport = require('passport');
const {storeReturnTo, isAdmin, requireLogin, validateUser,isLoggedIn} = require('../middleware');
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({dest: storage})
const fileUpload = require('express-fileupload')
const sendMail = require('../controllers/sendMail')

router.use(fileUpload({
    useTempFiles:true,
}))



router.get('/events' , (req, res) => {
    res.render('../views/event');
})


router.get('/signup', (req, res) => {
    res.render('signup')
})

//when users register or signup their info is saved in the db but they are required to login again which is kinda clunky so like logout passport provides a method called login() too which takes a user and logs them in and this too requires a callback same as logout does
router.post('/signup', validateUser, catchAsync(async (req, res) => {
    try {
        const { username, password, email, phone } = req.body;
        const user = new User({ username, email, phone });
        const registeredUser = await User.register(user, password); //register() automatically saves the user, we don't need to execute newUser.save() to save it to database.
        console.log('----------------------');
        console.log(registeredUser)
        console.log('----------------------');
        console.log(req.user)

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
    // console.log()
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


router.get('/user/profile', catchAsync(async(req, res) => {
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
    const myDogs = await Dog.find({owner: currUser._id});
    console.log('----------------------');
    console.log(myDogs);
    // const cats = await Cat.find({owner: req.user._id});
    // const birds = await Bird.find({owner: req.user._id});
    // const smallandfurries = await Smallandfurry.find({owner: req.user._id});
    // const others = await Other.find({owner: req.user._id});
    res.render('../views/profile', {currUser, myDogs});
}))


router.get('/feedback', isLoggedIn,(req, res) => {
    res.render('feedback.ejs');
})

router.post('/feedback', isLoggedIn,catchAsync(async (req, res) => {
    const { subject, feedback } = req.body;
    await User.updateOne({ _id: req.user._id }, { $push: { subject: subject, feedback: feedback } });
    sendMail(req.user.username,req.user.email,req.body.subject,req.body.feedback)
    req.flash('success', 'Feedback submitted successfully!');
    res.redirect('/user/profile');
}))

router.get('/faq', (req, res) => {
    res.render('faq.ejs');
})



router.get('/donate', isLoggedIn,(req, res) => {
    res.render('donate.ejs');
})

router.post('/donate',isLoggedIn , upload.single('image'),catchAsync(async (req, res) => {

    const {pet, name, breed, description  , age, image ,isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate } = req.body;
    // const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
    // dog.owner = req.user._id;
    // await dog.save();
    // res.redirect('/adopt/dogs');
    switch(pet){
        case 'dog':
            const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                dog.owner = req.user._id;
            await dog.save();
            res.redirect('/adopt/dogs');
            break;
        case 'cat':
            const cat = new Cat({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                cat.owner = req.user._id;
            await cat.save();
            res.redirect('/adopt/cats');
            break;
        case 'bird':
            const bird = new Bird({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                bird.owner = req.user._id;
            await bird.save();
            res.redirect('/adopt/birds');
            break;
        case 'smallandfurry':
            const smallandfurry = new Smallandfurry({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                smallandfurry.owner = req.user._id;
            await smallandfurry.save();
            res.redirect('/adopt/smallandfurries');
            break;
        case 'other':
            const other = new Other({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                other.owner = req.user._id;
            await other.save();
            res.redirect('/adopt/others');
            break;
        default:
            res.redirect('/adopt');
            break;
    }
}))




module.exports = router;
