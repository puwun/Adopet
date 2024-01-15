const mongoose = require('mongoose')
const {Schema} = mongoose;

    const categorySchema = new Schema({
        categoryName: {
            type: String,
            required: [true, 'Category name is required'],
        },
        pets: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }]
    })

const Category = mongoose.model('Category', categorySchema);  
module.exports =  Category;