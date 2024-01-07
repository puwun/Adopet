const express = require('express');
const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();


//this file is for all the routes that start with /articles but we do not need to write /articles in front of each route
//we can just write / and it will be assumed that it is /articles, its like treating this file as main page 



// let ART  = articles.items.find()
router.get('/', async (req, res) =>{
    let aart = await Article.find({})

    res.render('../views/articles/index', {aart})
})

// router.get('/', (req, res) =>{
//     res.render('../views/articles/temp')
// })



router.get('/new', (req, res) =>{
    res.render('../views/articles/new')
})

router.post('/new', catchAsync(async (req, res) => {
    
    const article = new Article(req.body);
    await article.save();
    // res.json({ success: true, article });
    // res.redirect(`/articles/${article._id}`)
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
    res.send('editing a specific article');
}))



module.exports = router;