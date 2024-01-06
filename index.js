const express = require('express') ;
const app = express();
const mongoose = require('mongoose');
const ExpressError = require('express-error-handler');
const UserRoutes = require('./routes/user');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');



app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/pet-adoption', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Mongo connection open!')
})
.catch(err =>{
    console.log('Mongo connection error!')
    console.log(err)
})


function catchAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e => next(e))
    }
}

//session
const sessionOptions = {secret: 'notagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions));
app.use(flash());
app.get('/viewcount', async(req,res)=>{
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})





app.get('/signup', (req, res) => {
//   res.send('Hello World!');
  res.render('signup.ejs');
})

app.get('/feedback', (req, res) => {
//   res.send('Hello World!');
    res.render('feedback.ejs');
})

app.get('/faq', (req, res) => {
//   res.send('Hello World!');
    res.render('faq.ejs');
})

app.get('/donate', (req, res) => {
//   res.send('Hello World!');
    res.render('donate.ejs');
})

app.post('/signup', async (req, res) => {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    try {
        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
)

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

app.listen(3000, () => {
  console.log('Server is listening on port 3000!!!')
});

