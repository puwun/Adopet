const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('express-error-handler');
const userRouter = require('./routes/user');
const petRouter = require('./routes/adopt');
const articleRouter = require('./routes/articles');
const User = require('./models/user');
const Article = require('./models/article');
const Pet = require('./models/pet');
const { use } = require('passport');
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
//makeing schema validations using joi for phone using regex as we have set its type to be string




//Chnages to be mad
// ---> every query string should begin with something like localhost:3000/adopet/corresponding_route see wikipedia for eg




app.set('view engine', 'ejs');
app.set('views', './views');   //lets express know where to look for views
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
//we need to pass a secret here
//In production, it shouldnt even be written in the file directly. It should be in an environment variable
app.use(cookieParser('thisismysecret'));

app.use(express.static(path.join(__dirname, 'public')))



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
    httpOnly: true,       //if this flag is included then the cookie cannot be accessed by client side javascript
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
    res.render('home');
    // res.send('THIS IS HOME PAGE text');
    // res.render('/map/index.html');
})

// app.get('/home', (req, res) => {    
//     res.render('home');
// })


app.use('/', userRouter);
app.use('/adopt', petRouter);


app.get('/fakeUser', async(req, res)=>{
    const user = new User({
        email: 'fake@gmail.com',
        username: 'fakeUser',
        phone: 1234567890
    })
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})

app.get('/secret',requireLogin, (req, res) =>{
    res.send('THIS IS SECRET PAGE');
})





app.get('/feedback', (req, res) => {
    res.render('feedback.ejs');
})

app.get('/faq', (req, res) => {
    res.render('faq.ejs');
})



app.get('/donate', (req, res) => {
    res.render('donate.ejs');
})

app.post('/donate', catchAsync(async (req, res) => {
    const {pet, name, breed, description  , age, image ,isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate } = req.body;
    const newPet = new Pet({pet, name, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
    await newPet.save();
    switch(pet){
        case 'dog':
            res.redirect('/adopt/dogs');
            break;
        case 'cat':
            res.redirect('/adopt/cats');
            break;
        case 'bird':
            res.redirect('/adopt/birds');
            break;
        case 'smallandfurry':
            res.redirect('/adopt/smallandfurries');
            break;
        case 'other':
            res.redirect('/adopt/others');
            break;
        default:
            res.redirect('/adopt');
            break;
    }
}))


app.use('/articles', articleRouter);




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
app.get('/setname', (req, res) => {
    res.cookie('name', 'stevie chicks')
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!!')
})

app.get('/getcookie', (req, res) => {
    // console.log(req.cookies);
    const { name = 'No-name', animal = 'No-animal' } = req.cookies;
    res.send(`HEYYYY, ${name}`)
}   
)

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true})
    res.send('OK SIGNED YOUR FRUIT COOKIE!!!')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies, req.signedCookies);
    res.send(req.signedCookies)
})

//if we visit a site and it sets us a cookie then that cookie stays with us and is carried forward to all the requests that we make to that site
//Cookies are domain-specific, meaning they are associated with a specific domain and are not accessible by other domains.

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
//     }
// )

    // app.get('*', (req, res) => {
    //     res.send('I dont know this path!!')
    // })


app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode)
    res.render('error', {err});
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000!!!')
});

