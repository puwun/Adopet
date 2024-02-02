const Article = require('../models/article');

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

module.exports.createNew = async (req, res, next) => {
    const article = new Article(req.body);
    article.author = req.user._id;
    // const resp = res.json(req.files)
    // console.log(resp)
    // console.log('----------------------');
    // console.log(req.body)
    // console.log('----------------------');
    // console.log(req.body.cover);
    // console.log('----------------------');
    // console.log(req.file);
    // console.log('----------------------');
    // console.log(req.files);
    // console.log('----------------------');
    // console.log(req.files.cover.name);
    article.cover = req.body.cover;
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