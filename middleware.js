const BaseJoi = require('joi');
const Article = require('./models/article');
const ExpressError = require('./utils/ExpressError');
const Dog = require('./models/pets/dog');
const Cat = require('./models/pets/cat');
const Bird = require('./models/pets/bird');
const Smallandfurry = require('./models/pets/saf');
const Other = require('./models/pets/other');
const sanitizeHTML = require('sanitize-html');
// const 


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
            });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension)

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/adopet/login')
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


const isDogOwner = async(req, res, next) =>{
    const {id} = req.params;
    const dog = await Dog.findById(id);
    if(!dog.owner.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/adopt/dogs/${id}`);
    }
    next();
}
const isCatOwner = async(req, res, next) =>{
    const {id} = req.params;
    const cat = await Cat.findById(id);
    if(!cat.owner.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/adopt/cats/${id}`);
    }
    next();
}
const isBirdOwner = async(req, res, next) =>{
    const {id} = req.params;
    const bird = await Bird.findById(id);
    if(!bird.owner.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/adopt/birds/${id}`);
    }
    next();
}
const isOtherOwner = async(req, res, next) =>{
    const {id} = req.params;
    const other = await Other.findById(id);
    if(!other.owner.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/adopt/others/${id}`);
    }
    next();
}
const isSmallandfurryOwner = async(req, res, next) =>{
    const {id} = req.params;
    const smallandfurry = await Smallandfurry.findById(id);
    if(!smallandfurry.owner.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/adopt/smallandfurrys/${id}`);
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
    isAdmin,
    isDogOwner,
    isCatOwner,
    isBirdOwner,
    isOtherOwner,
    isSmallandfurryOwner
  };