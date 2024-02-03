const Article = require('../models/article');
const cloudinary = require('cloudinary').v2;
const {storage} = require('../cloudinary/index')
const fileUpload = require('express-fileupload')



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
    const author = req.user._id;
    const photo = req.files.coverImage;
    const cover = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(photo.tempFilePath, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result.secure_url);
          }
        });
    });
    const {title, content} = req.body;
    const article = new Article({title, content,author, cover});
    await article.save();
    req.flash('success', 'Successfully made a new article!');
    res.redirect('/articles')
}

module.exports.renderOne = async (req, res) => {
    // const { id } = req.params;
    const article = await Article.findById(req.params.id).populate('author');
    res.render('../views/articles/show', {article})
}

module.exports.editOne = async (req, res) => {
    // res.send('editing a specific article');
    const { id } = req.params;
    const article = await Article.findById(id);
    if(!article){
        res.flash('error', 'Cannot find that article!');
        return res.redirect('/articles');
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
     res.redirect(`/articles/${article._id}`) 
}

module.exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    await Article.findByIdAndDelete(id);
    res.redirect('/articles');
}