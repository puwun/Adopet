const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const Pet = require('../models/pet');
const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');

const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {isLoggedIn, validateUser, requireLogin } = require('../middleware');

//creating a page for every category of pet

router.get('/', (req, res) => { 
    res.render('../views/adopt/index')
})



//DOGS
// router.get('/dogs', catchAsync(async(req, res) => { 
//     let doggies = await Pet.find({pet: 'dog'});
//     res.render('../views/adopt/doggies/dogs', {doggies})
// }))
router.get('/dogs', catchAsync(async(req, res) => { 
    let doggies = await Dog.find({});
    res.render('../views/adopt/doggies/dogs', {doggies})
}))


router.get('/dogs/:id', catchAsync(async(req, res) => {
    // const { id, pet } = req.params;
    const dog = await Dog.findById(req.params.id).populate('owner');
    // const dog = await Dog.find({pet: 'dog',_id : id}).populate('owner');
    console.log('----------------------');
    console.log(dog);
    console.log('----------------------');
    // console.log(dog.user.username );
    res.render('../views/adopt/doggies/show', {dog});
}))





// router.get('/dogs/:id', catchAsync(async(req, res) => {
//     const { id, pet } = req.params;
//     // if(pet === 'dog'){
//         const dog = await Pet.findById(id).populate('user');
//     // }
//     // const dog = await Pet.find({pet: 'dog', _id: id}).populate('user');
//     console.log('----------------------');
//     console.log(dog);
//     console.log('----------------------');
//     // console.log(dog.user.username   );
//     res.render('../views/adopt/doggies/show', {dog});
// }))


//CATS
router.get('/cats', catchAsync(async(req, res) => { 
    let kitties = await Cat.find({});
    res.render('../views/adopt/kitties/cats', {kitties})
}))

router.get('/cats/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const cat = await Cat.findById(id).populate('owner');
    // }
    // const dog = await Pet.find({pet: 'dog', _id: id}).populate('user');
    console.log('----------------------');
    console.log(cat);
    console.log('----------------------');
    // const cat = await Pet.find({pet: 'cat', _id: id});
    // console.log(cat);
    res.render('../views/adopt/kitties/show', {cat});
}))


//BIRDS
router.get('/birds', catchAsync(async(req, res) => { 
    let birdies = await Bird.find({});
    res.render('../views/adopt/birdies/birds', {birdies})
}))

router.get('/birds/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const bird = await Bird.findById(id).populate('owner');
    //    const bird = await Bird.find({pet: 'dog',_id : id}).populate('owner');
    // console.log(bird);
    res.render('../views/adopt/birdies/show', {bird});
}))


//SAMLL AND FURRIES
router.get('/smallandfurries', catchAsync(async(req, res) => { 
    let smallandfurries = await Smallandfurry.find({});
    res.render('../views/adopt/sandf/smallandfurries', {smallandfurries})
}))

router.get('/smallandfurries/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const smallandfurries = await Smallandfurry.findById(id);
    // console.log(bird);
    res.render('../views/adopt/sandf/show', {smallandfurries});
}))



//OTHER
router.get('/others', catchAsync(async(req, res) => { 
    let other = await Other.find({});
    res.render('../views/adopt/others/other', {other})
}))

router.get('/others/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    const other = await Other.find(id);
    // console.log(bird);
    res.render('../views/adopt/others/show', {other});
}))







router.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode)
    res.render('error', {err});
})

module.exports = router;