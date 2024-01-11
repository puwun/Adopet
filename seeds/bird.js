const mongoose = require('mongoose');
const Bird = require('../models/pet/bird');



// janhavi id 659c17cb621f1ca0f409e2cf

/**
 * procedure for seeding
 * 1. delete all existing records
 * 2. create new records
 * 3. reference wali field sathi ek sample kontyapn user cha id takycha 
 * ani router.get('/dogs/:id' ikde jaun findById pudhe populate krycha
 * 
 */
mongoose.connect('mongodb://localhost:27017/pet-adoption')
    .then(() => {
        console.log('Mongo connection opennnn!')
    })
    .catch(err => {
        console.log('Mongo connection error!')
        console.log(err)
    })


const seedBirds = async()=>{ 
    await Bird.deleteMany({});
        const newBird = new Bird({
            pet: 'bird',
            name: 'laapatapanchi',
            breed: 'unknown',
            description: 'alien',
            age: 'unknown',
            image: 'unknown',
            medHistory: 'unknown',
            isFullyVaccinated: 'unknown',
            isGoodWithKids: 'unknown',
            gender: 'unknown',
            whyDonate: 'unknown',
            owner: '659ab183e37a2c272e23a8e4'
        })
        await newBird.save();



}



seedBirds();