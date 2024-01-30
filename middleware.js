const Joi = require('joi');
const Article = require('./models/article');
const ExpressError = require('./utils/ExpressError');



const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login')
    }
    next();
}

const storeReturnTo = (req, res, next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


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


const validateArticle = (req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string(),
        cover: Joi.string(),
    }).required()
    const { error } = articleSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
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



const isAuthor = async(req, res, next)=>{
    const { id } = req.params;
    const article = await Article.findById(id);
    if(!article.author.equals(req.user._id)) {
           req.flash('error', 'You do  not have permission to do that!');
           return res.redirect(`/articles/${id}`);
       }
       next();
}   




const isAdmin = (req, res, next) => {
    if(req.user.role === 0){
        req.flash('error', 'Access denied, you must be an admin to do that!');
        return
    }next();
}
// Exporting all middleware functions as an object
module.exports = {
    isLoggedIn,
    requireLogin,
    validateUser,
    validateArticle,
    isAuthor,
    storeReturnTo,
    isAdmin
  };