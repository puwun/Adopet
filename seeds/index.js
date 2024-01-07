const mongoose = require('mongoose');
const Article = require('../models/article');

mongoose.connect('mongodb://localhost:27017/pet-adoption')
    .then(() => {
        console.log('Mongo connection opennnn!')
    })
    .catch(err => {
        console.log('Mongo connection error!')
        console.log(err)
    })

const seedArticles = async()=>{
    await Article.deleteMany({});
    const article = new Article({
        title: 'first article',
        content: 'first article content'
    })
    await article.save();
}

seedArticles();