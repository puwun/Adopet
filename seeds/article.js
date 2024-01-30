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
        content: 'first article content',
        author: '659ab183e37a2c272e23a8e4',
        cover: 'https://images.pexels.com/photos/3171712/pexels-photo-3171712.jpeg?auto=compress&cs=tinysrgb&w=600'
    })
    await article.save();
}

seedArticles();