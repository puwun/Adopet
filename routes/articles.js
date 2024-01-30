const express = require('express');
const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');
const { validateArticle, isLoggedIn, isAuthor} = require('../middleware');
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})
// const passport = require('passport');  redundant as even without importing passport we were able to use .isAuthenticated() bcoz we had already imported it in index.js


//this file is for all the routes that start with /articles but we do not need to write /articles in front of each route
//we can just write / and it will be assumed that it is /articles, its like treating this file as main page 





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

router.post('/new', isLoggedIn, validateArticle, upload.single('cover'), catchAsync(async (req, res, next) => {
    const article = new Article(req.body);
    article.author = req.user._id;
    // const resp = res.json(req.files)
    // console.log(resp)
    console.log('----------------------');
    console.log(req.body)
    console.log('----------------------');
    console.log(req.body.cover);
    console.log('----------------------');
    console.log(req.file);
    console.log('----------------------');
    console.log(req.files);
    console.log('----------------------');
    // console.log(req.files.cover.name);
    article.cover = req.body.cover;
    await article.save();
    req.flash('success', 'Successfully made a new article!');
    res.redirect('/articles')
}
))


// router.post('/new', (req, res) =>{
//     res.send(req.body)
// })

//required User so that only a particular user can edit/deletee his article
router.get('/:id', catchAsync(async (req, res) => {
    // const { id } = req.params;
    const article = await Article.findById(req.params.id).populate('author');
    // console.log('----------------------')
    // console.log(article)
    // console.log('----------------------')
    // console.log(article.author)
    // console.log('----------------------')
    // console.log(article.author.username)
    res.render('../views/articles/show', {article})
}))

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    // res.send('editing a specific article');
    const { id } = req.params;
    const article = await Article.findById(id);
    if(!article){
        res.flash('error', 'Cannot find that article!');
        return res.redirect('/articles');
    }
    res.render('../views/articles/edit', {article})
}))


router.put('/:id', isLoggedIn, isAuthor, validateArticle, catchAsync(async (req, res) => {
    // res.send('updating a specific article');
    const { id } = req.params;
     const article =  await Article.findByIdAndUpdate(id, {...req.body});
    //  console.log(id)
    //  console.log(req.body)
    //  console.log(article)
    //  res.json({article})
     res.redirect(`/articles/${article._id}`) 
}))


router.delete('/:id', isLoggedIn,isAuthor, catchAsync(async (req, res) => {
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