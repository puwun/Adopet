const express = require('express');
const Article = require('../models/article');
const router = express.Router();


//this file is for all the routes that start with /articles but we do not need to write /articles in front of each route
//we can just write / and it will be assumed that it is /articles, its like treating this file as main page 


function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}




router.get('/', catchAsync(async (req,res) =>{
    const articles = await Article.find({});
    res.render('../views/articles/index', {articles})
}))

router.get('/new', (req, res) =>{
    // res.send('new article page')
    res.render('../views/articles/new')
})
router.post('/', catchAsync(async(req, res) =>{
    // res.send('articles main page')
    // res.render('../views/articles/index')
    const {title, content } = req.body;    //rather than extracting everything and passing everything, its better to pass the entire body itself
    const article = new Article({title, content });
    // const article = new Article(req.body);
    await article.save();
    res.redirect('../articles/index');
    // res.send(req.body)
}))

// router.post('/new', catchAsync(async (req, res) => {
//     const {title, content } = req.body;
//     const article = new Article({title, content });
//     await article.save();
//     res.json({ success: true, article });
// }
// ))

// router.post('/new', (req, res) =>{
//     res.send(req.body)
// })


router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.send(`viewing a specific article of user ${id} which is based on ${article.title}`);

}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    res.send('editing a specific article');
}))



module.exports = router;










