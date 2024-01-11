const mongoose = require('mongoose')
const {Schema} = mongoose;


// By referencing the model name as a string, you ensure that Mongoose can resolve the models during runtime without encountering issues related to schema compilation order.
// Remember that when you populate a field that references another model, use the same string name as the model you want to populate. For example:
// Assuming you have a pet document with a category field referencing a Category document
// const populatedPet = await Pet.findById(somePetId).populate('category');
// This approach helps Mongoose handle circular dependencies more effectively.

const dogSchema = new Schema({
    pet : {
        type: String,
        required: [true, 'Type of animal is required'],
    },
    name: {
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
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    owner: {
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

const Dog = mongoose.model('Dog', dogSchema);
module.exports = Dog;