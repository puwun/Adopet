const mongoose = require('mongoose');
const {Schema} = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        // required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    cover:{
        type: String,
        required: [true, 'Cover image is required'],
    },
    }
    // comments:
    
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
)



const Article = mongoose.model('Article', articleSchema);
module.exports = Article;