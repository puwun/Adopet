const mongoose = require('mongoose');
const {Schema} = mongoose;

const likeSchema = new Schema({
    dog: [{
        type: Schema.Types.ObjectId,
        ref: 'Dog'
    }],
    cat: [{
        type: Schema.Types.ObjectId,
        ref: 'Cat'
    }],
    bird: [{
        type: Schema.Types.ObjectId,
        ref: 'Bird'
    }],
    other: [{
        type: Schema.Types.ObjectId,
        ref: 'Other'
    }],
    saf: [{
        type: Schema.Types.ObjectId,
        ref: 'Smallandfurry'
    }],

})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;