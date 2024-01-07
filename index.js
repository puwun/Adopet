const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('express-error-handler');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/articles');
const User = require('./models/user');
const Article = require('./models/article');
const Pet = require('./models/pet');
const { use } = require('passport');
const catchAsync = require('./utils/catchAsync');
const Joi = require('joi');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');



app.set('view engine', 'ejs');
app.set('views', './views');   //lets express know where to look for views
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));


mongoose.connect('mongodb://localhost:27017/pet-adoption')
    .then(() => {
        console.log('Mongo connection open!')
    })
    .catch(err => {
        console.log('Mongo connection error!')
        console.log(err)
    })


//session
// const sessionOptions = { secret: 'notagoodsecret', resave: false, saveUninitialized: false }
// app.use(session(sessionOptions));
// app.use(flash());
// app.get('/viewcount', async (req, res) => {
//     if (req.session.count) {
//         req.session.count += 1;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You have viewed this page ${req.session.count} times`)
// })


app.get('/', (req, res) => {
    // res.render('home.ejs');
    res.send('THIS IS HOME PAGE text');
    // res.render('index');
})


app.use('/signup', userRouter);

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
    const {petName, breed, description  , age, image ,isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate } = req.body;
    const pet = new Pet({petName, breed, description, age, image, isFullyVaccinated, medHistory ,isGoodWithKids, gender, whyDonate });
    await pet.save();
    res.json({ success: true, pet });
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

