if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const ExpressError = require('express-error-handler');
const userRouter = require('./routes/user');
const petRouter = require('./routes/adopt');
const articleRouter = require('./routes/articles');
const User = require('./models/user');
const Article = require('./models/article');
const Dog = require('./models/pets/dog');
const Cat = require('./models/pets/cat');
const Bird = require('./models/pets/bird');
const Smallandfurry = require('./models/pets/saf');
const Other = require('./models/pets/other');
// const { use } = require('passport');
const catchAsync = require('./utils/catchAsync');
const Joi = require('joi');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
const validateUser = require('./routes/user');
const requireLogin = require('./routes/user');
const { isLoggedIn, storeReturnTo } = require('./middleware');
const sendMail = require('./controllers/sendMail')
//makeing schema validations using joi for phone using regex as we have set its type to be string
const fileUpload = require('express-fileupload')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
// app.use(fileUpload({
//     useTempFiles:true,
// }))



//Chnages to be mad
// ---> every query string should begin with something like localhost:3000/adopet/corresponding_route see wikipedia for eg
// ---> should comments be added to a blog???
// ---> admin should be able to delete inappropriate blogs and comments
// ---> adopter should be able to send a enquiry to the owner of the pet which should be (visible to the owner) first viewed by the admin
/*enquiry placeholder
IMPORTANT -You will be reviewed as a potential adopter based on your profile and initial enquiry. Please fill out the form below to the best of your ability. We will contact you if we feel you are a good match for the pet you are interested in. Please note that we are a volunteer-run organization and it may take us a few days to get back to you. Thank you for your patience and understanding.
*/
//So basically if we were to add an enquiry option we have to add admin as a user which will approve all the enquiries and then the owner will be able to see the enquiries and then he can approve or reject them
//ANother option is a direct chat interface between the owner and the adopter
//in case of admin login, we can create a new model called enquiry and then the admin can see all the enquiries and then he can approve or reject them - copilot
// ---> add a search bar to search for pets
//in case of admin, we can add an attribute isAdmin to the User model and then we can check if the user is admin or not and then we can show the admin page accordingly
// for every route we have to make changes whether it can be viewed by guest, user or admin
//some major changes needs to be make due to our admin feature
// forget password works on jwt but we have used pasportJs, so i dont know how to implement it
//our admin user is basically various typw of pet saving orgs so we also need to validate them and options for them to reach out to adopter as well as donator a
//making website MongoInjection proof
//asnitising HTML w Joi 
//implementing use of HelmetJs which removes various vulnerabilities like xss(cross-site-scripting), clickjacking, etc
//just before deployment, change all error routes to render 404.ejs 
//currently first priority is user profile bcoz all the update and delete routes for it are remaining
//validatePets isOwner middleware is to be made
//delete all the inital entries which were from seed users
//or else send delete req using postman
//uncomment all the restrictions in the Joi schemas
//setup is done but implementation of escapeHTML remains
//user profile is to be made
// user profile update routes
//img display for pets
//changed email pass to env var so see if it works or not
//faq option to be replsced by reviews like in petnest https://thepetnest.com/?gclid=Cj0KCQiAzoeuBhDqARIsAMdH14HXwEquiy-QzD3d9VIorWT7fCfVbpH2VB7aEg1gK0Emrzy-2xdEv5AaAhpPEALw_wcB
//future scope - signup login with google
//validating all forms is remaining


app.set('view engine', 'ejs');
app.set('views', './views');   //lets express know where to look for views
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
//we need to pass a secret here
//In production, it shouldnt even be written in the file directly. It should be in an environment variable
app.use(cookieParser('thisismysecret'));

app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize());   //doesnt allow any $ or . in the query string
//xss game helps in exploring xss vulnerabilities
app.use(helmet({contentSecurityPolicy: false}));   //this is a middleware that helps in securing our app by setting various http headers


mongoose.connect('mongodb://localhost:27017/pet-adoption')
    .then(() => {
        console.log('Mongo connection open!')
    })
    .catch(err => {
        console.log('Mongo connection error!')
        console.log(err)
    })


//session
const sessionConfig = { secret: 'notagoodsecret', 
resave: false, 
saveUninitialized: true, 
cookie: {
    name: 'woof',        //this is the name of the cookie that will be sent to the browser, by default it is connect.sid, if someone is specifically looking for connect.sid on our site for any malpractices then they wont find it as it is now renamed as woof 
    httpOnly: true,       //if this flag is included then the cookie cannot be accessed by client side javascript
    // secure: true,        //if this flag is included then the cookie will only be sent over https but we are currently on localhost so uncomment it only when we deploy our site
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,       //Date.now() works in milliseconds so 1000ms * 60s * 60min * 24hrs * 7days
    maxAge: 1000 * 60 * 60 * 24 * 7                //expiration in 1 week
}}


//expiration is imp bcoz once we use it for authentication, after that someone will stay loggqed in forever just by signing in once
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));   //authenticate is a static method that is added to the model automatically by passport-local-mongoose
passport.serializeUser(User.serializeUser()) //states how do we store user in the session
passport.deserializeUser(User.deserializeUser()) //how do we get user out of the session

app.use((req, res, next) =>{
    app.locals.currentUser = req.user;    //this means i have access to currentUser in all the folders 
    res.locals.success  = req.flash('success');    //same with both these flashes
    res.locals.error  = req.flash('error');
    next();
})



//Use res.render when you want to generate and send HTML content to be displayed by the client, here filepath needs to be specified.
// Use res.redirect when you want to instruct the client's browser to navigate to a different URL like after submitting a form, here the query string needs to be specified.

// app.get('/viewcount', async (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You have viewed this page ${req.session.count} times`)
// })

// app.get('/register' , (req,res)=>{
//     const {username = 'Anonymous'} = req.query;
//     req.session.username = username;
//     res.redirect('/greet');
// })

// app.get('/greet', (req,res) =>{
//     const {username} = req.session;
//     res.send(`Welcome back ${username}`)
// })


//we call req.flash before  we redirect, and wherever we redirect to we can call req.flash and retrieve the message under the key that we specified 
//call before redirecting req.flash('success', 'Successfully made a new article!')
// call after redirecting {messages: req.flash('success')}
//or else simpler way is by using req.locals which omits the second step



app.get('/', (req, res) => {    
    res.render('landing');
})


app.use('/adopet', userRouter);
app.use('/adopet/adopt', petRouter);
app.use('/adopet/articles', articleRouter);


// app.get('/fakeUser', async(req, res)=>{
//     const user = new User({
//         email: 'fake@gmail.com',
//         username: 'fakeUser',
//         phone: 1234567890
//     })
//     const newUser = await User.register(user, 'chicken');
//     res.send(newUser);
// })

// app.get('/secret',requireLogin, (req, res) =>{
//     res.send('THIS IS SECRET PAGE');
// })






// app.get('/feedback', isLoggedIn, (req, res) => {
//     res.render('feedback.ejs');
// })


// app.post('/feedback', isLoggedIn, catchAsync(async (req, res) => {
//     const {subject,feedback} = req.body;
//     await User.findByIdAndUpdate(id, {subject : subject,feedback:feedback});
//     sendMail(req.user.username,req.user.email,req.body.subject,req.body.feedback)
// }))

// app.get('/faq', isLoggedIn, (req, res) => {
//     res.render('faq.ejs');
// })




// app.post('/donate',isLoggedIn ,catchAsync(async (req, res) => {
//     const {pet, name, breed, description  , age, image ,isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate } = req.body;
//     // const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//     // dog.owner = req.user._id;
//     // await dog.save();
//     // res.redirect('/adopt/dogs');
//     switch(pet){
//         case 'dog':
//             const dog = new Dog({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//                 dog.owner = req.user._id;
//             await dog.save();
//             res.redirect('/adopt/dogs');
//             break;
//         case 'cat':
//             const cat = new Cat({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//                 cat.owner = req.user._id;
//             await cat.save();
//             res.redirect('/adopt/cats');
//             break;
//         case 'bird':
//             const bird = new Bird({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//                 bird.owner = req.user._id;
//             await bird.save();
//             res.redirect('/adopt/birds');
//             break;
//         case 'smallandfurry':
//             const smallandfurry = new Smallandfurry({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//                 smallandfurry.owner = req.user._id;
//             await smallandfurry.save();
//             res.redirect('/adopt/smallandfurries');
//             break;
//         case 'other':
//             const other = new Other({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
//                 other.owner = req.user._id;
//             await other.save();
//             res.redirect('/adopt/others');
//             break;
//         default:
//             res.redirect('/adopt');
//             break;
//     }
// }))







//the above middleware is used to prefix all the routes in articleRouter with /articles
//it implies that we are USING the prefix /articles for all the middlewares in articleRouter


// app.post('/signup', catchAsync(async (req, res) => {
//     const {username, password, email, phone } = req.body;
//     const user =  User.create({username, email, phone});
//     await user.save();
//     // await User.signup(user, password)
//     // res.send(req.body);
//     res.json('success',user);
//     // res.send(user);
//     console.log(user);

//     // UserRoutes.save(req.body);
//     }
// ))





//cookieDemo
// app.get('/setname', (req, res) => {
//     res.cookie('name', 'stevie chicks')
//     res.cookie('animal', 'harlequin shrimp')
//     res.send('OK SENT YOU A COOKIE!!!')
// })

// app.get('/getcookie', (req, res) => {
//     // console.log(req.cookies);
//     const { name = 'No-name', animal = 'No-animal' } = req.cookies;
//     res.send(`HEYYYY, ${name}`)
// }   
// )

// app.get('/getsignedcookie', (req, res) => {
//     res.cookie('fruit', 'grape', {signed: true})
//     res.send('OK SIGNED YOUR FRUIT COOKIE!!!')
// })

// app.get('/verifyfruit', (req, res) => {
//     console.log(req.cookies, req.signedCookies);
//     res.send(req.signedCookies)
// })

//if we visit a site and it sets us a cookie then that cookie stays with us and is carried forward to all the requests that we make to that site
//Cookies are domain-specific, meaning they are associated with a specific domain and are not accessible by other domains.

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
//     }
// )

app.get('*', (req, res) => {
    // res.send('I dont know this path!!')
    res.render('404.ejs');
})


app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode)
    // res.render('./partials/displayError', {err});
    res.render('404.ejs');
})

app.listen(3000, () => {
    console.log(`Server is listening on port ${port}!!!`)
});

