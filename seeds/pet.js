const mongoose = require('mongoose');
const Pet = require('../models/pet');



// janhavi id 659c17cb621f1ca0f409e2cf
//shinchan id 659f908311bd4c31a9ac1260

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


const seedPets = async()=>{ 
    await Pet.deleteMany({});
    const newPet = new Pet({
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

    // if(Pet.pet === 'dog'){
    //     const newPet = new Pet({
    //         pet: 'dog',
    //         name: 'laapata',
    //         breed: 'unknown',
    //         description: 'alien',
    //         age: 'unknown',
    //         image: 'unknown',
    //         medHistory: 'unknown',
    //         isFullyVaccinated: 'unknown',
    //         isGoodWithKids: 'unknown',
    //         gender: 'unknown',
    //         whyDonate: 'unknown',
    //         user: '659c17cb621f1ca0f409e2cf'
    //     })
    //     await newPet.save();
    // }else if(Pet.pet === 'cat'){
    //     const newPet = new Pet({
    //         pet: 'cat',
    //         name: 'laapata',
    //         breed: 'unknown',
    //         description: 'alien',
    //         age: 'unknown',
    //         image: 'unknown',
    //         medHistory: 'unknown',
    //         isFullyVaccinated: 'unknown',
    //         isGoodWithKids: 'unknown',
    //         gender: 'unknown',
    //         whyDonate: 'unknown',
    //         user: '659c17cb621f1ca0f409e2cf'
    //     })
    //     await newPet.save();
    // }

    await newPet.save();


}

seedPets();