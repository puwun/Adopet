const express = require('express');
const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');
const isLoggedIn = require('../middleware');
// const passport = require('passport');  redundant as even without importing passport we were able to use .isAuthenticated() bcoz we had already imported it in index.js


//this file is for all the routes that start with /articles but we do not need to write /articles in front of each route
//we can just write / and it will be assumed that it is /articles, its like treating this file as main page 


const validateArticle = (req, res, next) => {
        // const articleSchema = Joi.object({
    //     article : Joi.object({
    //         title : Joi.string().required(),    //colts pattern for validation was for article[title] and article[content] 
    //         content : Joi.string().required()
    //     }).required()
    // })
    const articleSchema = Joi.object({
        title : Joi.string().required(),
        content : Joi.string().required()
    })
    const {error} = articleSchema.validate(req.body)
    if(error){
    // console.log(error)
    // console.log(error.details[0].message)
    throw new ExpressError(error.details[0].message, 400)
    }
    else{
        next();
    }
}

router.get('/', async (req, res) =>{
    let aart = await Article.find({})
    res.render('../views/articles/index', {aart})
})

// router.get('/', (req, res) =>{
//     res.render('../views/articles/temp')
// })



router.get('/new',isLoggedIn ,(req, res) =>{
    res.render('../views/articles/new')
})

router.post('/new', isLoggedIn, validateArticle, catchAsync(async (req, res, next) => {
    const article = new Article(req.body);
    await article.save();
    req.flash('success', 'Successfully made a new article!');
    res.redirect('/articles')
}
))


// router.post('/new', (req, res) =>{
//     res.send(req.body)
// })


router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.render('../views/articles/show', {article})
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    // res.send('editing a specific article');
    const article = await Article.findById(req.params.id);
    res.render('../views/articles/edit', {article})
}))


router.put('/:id', validateArticle, catchAsync(async (req, res) => {
    // res.send('updating a specific article');
     const { id } = req.params;
     const article =  await Article.findByIdAndUpdate(id, {...req.body});
    //  console.log(id)
    //  console.log(req.body)
    //  console.log(article)
    //  res.json({article})
     res.redirect(`/articles/${article._id}`) 
}))


router.delete('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/articles');
}))

router.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode)
    res.render('error', {err});
})
module.exports = router;