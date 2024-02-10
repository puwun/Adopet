const Article = require('../models/article');
const cloudinary = require('cloudinary').v2;
const {storage} = require('../cloudinary/index')
const fileUpload = require('express-fileupload')
const User = require('../models/user');
const multer = require('multer')

const upload = multer({storage: storage})

module.exports.index = async (req, res) =>{

    let aart = await Article.find({})
    // console.log('----------------------')
    // console.log(aart)
    // console.log('----------------------')
    // console.log(req.body)
    res.render('../views/articles/index', {aart})
}

module.exports.getNew = (req, res) =>{
    res.render('../views/articles/new')
}

module.exports.createNew = async (req, res) => {

    const article = new Article(req.body);
    console.log(req.body)
    article.author = req.user._id;
    await article.save();
    console.log(article);
    req.flash('success', 'Successfully made a new article!');
    res.redirect(`/adopet/articles/${article._id}`);
}

module.exports.renderOne = async (req, res) => {
    // const { id } = req.params;
    const article = await Article.findById(req.params.id).populate('author');
    res.render('../views/articles/show', {article})
}


module.exports.addToFavourite =  async (req, res) => {
    const {id} = req.params;
    const article = await Article.findById(id).populate('author');
    //set a var to something and then when after we like it set it to something else 
    //or else the same logic as /auth action if else
    await User.updateOne({ _id: req.user._id }, { $push: { favourites: article } });
    console.log('----------------------')
    console.log(article)
    console.log('----------------------')
    console.log(req.user)
    console.log('----------------------')
    console.log(article.author)
    res.redirect(`/adopet/articles/${id}`)
}

module.exports.editOne = async (req, res) => {
    // res.send('editing a specific article');
    const { id } = req.params;
    const article = await Article.findById(id);
    if(!article){
        res.flash('error', 'Cannot find that article!');
        return res.redirect('/adopet/articles');
    }
    res.render('../views/articles/edit', {article})
}

module.exports.updateOne = async (req, res) => {
    // res.send('updating a specific article');
    const { id } = req.params;
     const article =  await Article.findByIdAndUpdate(id, {...req.body});
    //  console.log(id)
    //  console.log(req.body)
    //  console.log(article)
    //  res.json({article})
     res.redirect(`/adopet/articles/${article._id}`) 
}

module.exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/adopet/articles');
}