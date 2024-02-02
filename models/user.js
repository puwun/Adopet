const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
//add favourites to user schema 
//use article id reference to user schema

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        // unique: true,
        // minlength: 3,
        // maxlength: 20
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        // minlength: 3,
        // maxlength: 20
    },
    subject: [String],
    feedback: [String],
    question: [String],
    // role: {
    //     type: Number,
    //     default : 0
    // },
    favourites: [{type: Schema.Types.ObjectId,
        ref: 'Article',}],

    // likes: [{type: Schema.Types.ObjectId,
    //     ref: 'Like',}],
})

userSchema.plugin(passportLocalMongoose); //adds username,hash and salt to schema

const User = mongoose.model('User', userSchema);  //model name is users
// const a = new User({username: 'a', password: 'a', email: 'a', phone: 1234567890});
module.exports = User;