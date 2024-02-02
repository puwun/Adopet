const User = require('../../models/user');
const sendMail = require('../../controllers/sendMail')


module.exports.renderEvents = (req, res) => {
    res.render('../views/event');
}

module.exports.renderSignup = (req, res) => {
    res.render('signup')
}

module.exports.signup = async (req, res) => {
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

module.exports.renderLogin = (req, res) => {
    // res.send('THIS IS LOGIN PAGE');
    res.render('../views/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    // console.log()
    // console.log(req.body.role)
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl);
    // console.log(req.user);
    // console.log(req.flash('error'));
    // res.redirect('/');

}

module.exports.logout = (req, res) => {
    // req.session.user_id = null;
    // req.session.destroy();    //if we store more of users info then this is better   //not required in passport
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}

module.exports.renderProfile = async(req, res) => {
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
}


module.exports.renderFeedback = (req, res) => {
    res.render('feedback.ejs');
}

module.exports.sendFeedback = async (req, res) => {
    const { subject, feedback } = req.body;
    await User.updateOne({ _id: req.user._id }, { $push: { subject: subject, feedback: feedback } });
    sendMail(req.user.username,req.user.email,req.body.subject,req.body.feedback)
    req.flash('success', 'Feedback submitted successfully!');
    res.redirect('/user/profile');
}

module.exports.renderFaq = (req, res) => {
    res.render('faq.ejs');
}

module.exports.renderDonate =(req, res) => {
    res.render('donate.ejs');
}

module.exports.donate = async (req, res) => {

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
}