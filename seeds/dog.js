const mongoose = require('mongoose');
const Dog = require('../models/pets/dog');



// janhavi id 659c17cb621f1ca0f409e2cf 
// new user id 659f8f4de7f4346220ad938f
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


const seedDogs = async()=>{ 
    await Dog.deleteMany({});
        const newDog = new Dog({
            pet: 'dog',
            name: 'laapatakutta',
            breed: 'unknown',
            description: 'alien',
            age: 'unknown',
            image: 'unknown',
            medHistory: 'unknown',
            isFullyVaccinated: 'unknown',
            isGoodWithKids: 'unknown',
            gender: 'unknown',
            whyDonate: 'unknown',
            owner: '659c17cb621f1ca0f409e2cf'
        })
        await newDog.save();

}

seedDogs();