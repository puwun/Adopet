const mongoose = require('mongoose')
const {Schema} = mongoose;

const petSchema = new Schema({
    petName: {
        type: String,
        required: [true, 'Pet name is required'],

    },
    breed:{
        type: String,
    },
    description: {
        type: String,
        required: [true, 'Pet description is required'],

    },
    age:{
        type:String,
        required: [true, 'Age is required']
    },
    image: {
        type: String,
        required: [true, 'Pet image is required'],

    },
    medHistory: {
        type: String,
        required: [true, 'Pet image is required'],

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isFullyVaccinated: {
        type: String,// type: Boolean, 
        required: [true, 'Vaccinated is required'],
    },
    isGoodWithKids: {
        type: String, // type: Boolean,
        required: [true, 'Good with kids is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required']
    },
    whyDonate:{
        type: String,
        required:[true,"Reason is required"]
    }
})

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;