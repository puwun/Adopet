const User = require('../models/user');
const {sendFeedbackMail} = require('./sendMail');
const {storage} = require('../cloudinary/index')
const fileUpload = require('express-fileupload')
const Article = require('../models/article');
const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');
const cloudinary = require('cloudinary').v2;
const passport = require('passport');


module.exports.renderHome = (req, res) => {
    res.render('home');
    // res.send('THIS IS HOME PAGE text');
    // res.render('/map/index.html');
}

module.exports.renderEvents = (req, res) => {
    res.render('../views/event');
}

// module.exports.renderSignup = (req, res) => {
//     res.render('signup')
// }

// module.exports.signup = async (req, res) => {
//     try {
//         const { username, password, email, phone } = req.body;
//         const user = new User({ username, email, phone });
//         const registeredUser = await User.register(user, password); //register() automatically saves the user, we don't need to execute newUser.save() to save it to database.
//         // console.log('----------------------');
//         // console.log(registeredUser)
//         // console.log('----------------------');
//         // console.log(req.user)

//         req.login(registeredUser, err =>{
//             if(err) return next(err);
//             req.flash('success', 'Welcome to Adopet!');
//             res.redirect('/adopet');
//     })
//     } catch (e) {
//         // console.log(e.message);
//         req.flash('error', e.message);
//         res.redirect('/adopet/auth');

//         // res.send('error', e.message);
//     }
// }

// module.exports.renderLogin = (req, res) => {
//     // res.send('THIS IS LOGIN PAGE');
//     res.render('../views/login');
// }

// module.exports.login = (req, res) => {
//     req.flash('success', `Welcome back!`);
//     // console.log()
//     // console.log(req.body.role)
//     const redirectUrl = res.locals.returnTo || '/adopet';
//     res.redirect(redirectUrl); 
//     // console.log(req.user);
//     // console.log(req.flash('error'));
//     // res.redirect('/');

// }


module.exports.auth = async(req, res) => {
    const { action} = req.body;
    if (action === 'signup') {
        const { username, password, email, phone } = req.body;
        try{
        const user = new User({ username, email, phone });
        const registeredUser = await User.register(user, password); 
            req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Adopet!');
            res.redirect('/adopet');
        });
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/adopet/auth');
        }
        // res.send('user created', req.body);
    } else if (action === 'login') {
        const { username, password } = req.body;
        try{
            passport.authenticate('local', { failureFlash : true, failureRedirect: '/adopet/auth' })(req,res,()=>{ //Req, res is used so that the function is called as per middlewares defined
                // console.log(req.body)
                // console.log(req.user)
                // console.log(req.session.user)
                req.flash('success', 'Welcome back!');
                const redirectUrl = res.locals.returnTo || '/adopet';
                res.redirect(redirectUrl);
            })  
    }
        catch(e){
            req.flash('error', e.message);
            res.redirect('/adopet/auth');
        }
        // res.send('user logged in');
    }
    // res.redirect('/adopet');
}


module.exports.logout = (req, res) => {
    // req.session.user_id = null;
    // req.session.destroy();    //if we store more of users info then this is better   //not required in passport
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/adopet/auth');
    });
}

module.exports.renderProfile = async(req, res) => {
    // res.send('THIS IS PROFILE PAGE');
    // let users = await User.findById({cuurentUser._id});
    // let users = await User.findById(req.user._id);
    // const user = await User.findById(req.session.user.id);
    const currUser = req.user;
    if(!currUser){
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/adopet/auth');
    }
    // const user = await User.findById(req.session.user_id);
    // console.log(user);
    // console.log('----------------------');
    // console.log(req.user);
    console.log('----------------------');
    console.log(currUser);
    const myDogs = await Dog.find({owner: currUser._id});
    console.log('----------------------');
    console.log(myDogs);
    console.log('----------------------');
    const myFavArticles = req.user.favourites;
    console.log(myFavArticles); 
    const myFavBlogs = myFavArticles.filter((article, index) => myFavArticles.indexOf(article) === index);
    console.log(myFavBlogs); 
    const likedArticles = []
    for (const blog of myFavBlogs) {
        const article = await Article.findById(blog);
        likedArticles.push(article);
    }
    console.log('----------------------');
    console.log(likedArticles)

    //pass other animals too
    // const cats = await Cat.find({owner: req.user._id});
    // const birds = await Bird.find({owner: req.user._id});
    // const smallandfurries = await Smallandfurry.find({owner: req.user._id});
    // const others = await Other.find({owner: req.user._id});
    res.render('../views/profile', {currUser, myDogs, likedArticles});  //other animals and articles, comments need to be added too
}


module.exports.renderFeedback = (req, res) => {
    res.render('feedback.ejs');
}

module.exports.sendFeedback = async (req, res) => {
    const { subject, feedback } = req.body;
    await User.updateOne({ _id: req.user._id }, { $push: { subject: subject, feedback: feedback } });
    sendFeedbackMail(req.user.username,req.user.email,req.body.subject,req.body.feedback)
    req.flash('success', 'Feedback submitted successfully!');
    res.redirect('/adopet/user/profile');
}

module.exports.renderFaq = (req, res) => {
    res.render('faq.ejs');
}

module.exports.renderDonate =(req, res) => {
    res.render('donate.ejs');
}

module.exports.donate = async (req, res) => {
    const photo = req.files.imageFile;
    const med = req.files.medHistoryFile;
    const image = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result.secure_url);
          }
        });
    });
    const medHistory = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(med.tempFilePath, (err, result) => {
            if (err) {
            reject(err);
            } else {
            console.log(result);
            resolve(result.secure_url);
            }
        });
    });
    const {pet, name, breed, description  , age,isFullyVaccinated,isGoodWithKids, gender, whyDonate } = req.body;
    // const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
    // dog.owner = req.user._id;
    // await dog.save();
    // res.redirect('/adopt/dogs');
    switch(pet){
        case 'dog':
            const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                dog.owner = req.user._id;
            await dog.save();
            req.flash('success', `${dog.name} was added successfully!`);
            res.redirect('/adopet/adopt/dogs');
            break;
        case 'cat':
            const cat = new Cat({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                cat.owner = req.user._id;
            await cat.save();
            req.flash('success', `${cat.name} was added successfully!`);
            res.redirect('/adopet/adopt/cats');
            break;
        case 'bird':
            const bird = new Bird({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                bird.owner = req.user._id;
            await bird.save();
            req.flash('success', `${bird.name} was added successfully!`);
            res.redirect('/adopet/adopt/birds');
            break;
        case 'smallandfurry':
            const smallandfurry = new Smallandfurry({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                smallandfurry.owner = req.user._id;
            await smallandfurry.save();
            req.flash('success', `${smallandfurry.name} was added successfully!`);
            res.redirect('/adopet/adopt/smallandfurries');
            break;
        case 'other':
            const other = new Other({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
                other.owner = req.user._id;
            await other.save();
            req.flash('success', `${other.name} was added successfully!`);
            res.redirect('/adopet/adopt/others');
            break;
        default:
            res.redirect('/adopet/adopt');
            break;
    }
}