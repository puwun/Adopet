const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Pet = require('../models/pet');
const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');
const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {isLoggedIn, validateUser, requireLogin,isCatOwner, isDogOwner, isBirdOwner, isSmallandfurryOwner, isOtherOwner } = require('../middleware');
const {storage} = require('../cloudinary')
const adopt = require('../controllers/adopt');

//creating a page for every category of pet

router.get('/', adopt.index)



//DOGS
// router.get('/dogs', catchAsync(async(req, res) => { 
//     let doggies = await Pet.find({pet: 'dog'});
//     res.render('../views/adopt/doggies/dogs', {doggies})
// }))
router.get('/dogs', catchAsync(adopt.getDogs))


router.get('/dogs/search', catchAsync(adopt.searchDog))
router.get('/dogs/:id', catchAsync(adopt.getOneDog))
router.post('/dogs/:id', catchAsync(adopt.adoptDog))
router.get('/dogs/:id/edit', isLoggedIn , isDogOwner,catchAsync(adopt.editOneDog)) 
router.put('/dogs/:id',isDogOwner, catchAsync(adopt.updateOneDog))
router.delete('/dogs/:id',isDogOwner, catchAsync(adopt.deleteOneDog))


router.get('/dogs/search/:key', catchAsync(async(req,res) =>{
        console.log(req.params.key);
        const data = await Dog.find({
            $or: [
                {name: {$regex: req.params.key, $options: 'i'}}, //case-insensitive
                {breed: {$regex: req.params.key, $options: 'i'}},
                {description: {$regex: req.params.key, $options: 'i'}},
                //and other attributes
            ]
        })
        console.log(data);
        res.send(data)
    }))


//     const result = await Dog.aggregate([
//         {
//             "$search": {
//                 "index": 'search-text',
//                 "text": {
//                     "query": req.params.key,
//                     "path": {
//                         "wildcard": "*"
//                     }
//                 }
//             }
        
//         }
// ])
//     console.log(result);
//     res.send(result)
// }))

router.get('/cats/search/:key', catchAsync(async(req,res) =>{
    console.log(req.params.key);
    const data = await Cat.find({
        $or: [
            {name: {$regex: req.params.key}},
            {breed: {$regex: req.params.key}},
            {description: {$regex: req.params.key}},
        ]
    })
    console.log(data);
    res.send(data)
}))

router.get('/birds/search/:key', catchAsync(async(req,res) =>{
    console.log(req.params.key);
    const data = await Bird.find({
        $or: [
            {name: {$regex: req.params.key}},
            {breed: {$regex: req.params.key}},
            {description: {$regex: req.params.key}},
        ]
    })
    console.log(data);
    res.send(data)
}))
router.get('/smallandfurries/search/:key', catchAsync(async(req,res) =>{
    console.log(req.params.key);
    const data = await Smallandfurry.find({
        $or: [
            {name: {$regex: req.params.key}},
            {breed: {$regex: req.params.key}},
            {description: {$regex: req.params.key}},
        ]
    })
    console.log(data);
    res.send(data)
}))
router.get('/others/search/:key', catchAsync(async(req,res) =>{
    console.log(req.params.key);
    const data = await Other.find({
        $or: [
            {name: {$regex: req.params.key}},
            {breed: {$regex: req.params.key}},
            {description: {$regex: req.params.key}},
        ]
    })
    console.log(data);
    res.send(data)
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


// CATS
router.get('/cats', catchAsync(adopt.getCats))

router.get('/cats/:id', catchAsync(adopt.getOneCat))
router.post('/cats/:id', catchAsync(adopt.adoptCat))
router.get('/cats/:id/edit', isLoggedIn , isCatOwner,catchAsync(adopt.editOneCat)) 
router.put('/cats/:id', isCatOwner,catchAsync(adopt.updateOneCat))
router.delete('/cats/:id', isCatOwner,catchAsync(adopt.deleteOneCat))



//BIRDS
router.get('/birds', catchAsync(adopt.getBirds))
router.get('/birds/search' , catchAsync(async(req,res)=>{
    const {gender} = req.query;
    const birds = await Bird.find({})
    const filteredBirds =  birds.filter(bird => bird.gender === gender)
    res.json(filteredBirds)
}))
router.get('/birds/:id', catchAsync(adopt.getOneBird))
router.post('/birds/:id', catchAsync(adopt.adoptBird))
router.get('/birds/:id/edit',isLoggedIn, isBirdOwner, catchAsync(adopt.editOneBird)) 
router.put('/birds/:id', isLoggedIn,isBirdOwner,catchAsync(adopt.updateOneBird))
router.delete('/birds/:id', isLoggedIn,catchAsync(adopt.deleteOneBird))



//SAMLL AND FURRIES
router.get('/smallandfurries', catchAsync(adopt.getSmallandfurry))
router.get('/smallandfurries/:id', catchAsync(adopt.getOneSmallandfurry))
router.post('/smallandfurries/:id', catchAsync(adopt.adoptSmallandfurry))
router.get('/smallandfurries/:id/edit', isLoggedIn,isSmallandfurryOwner,catchAsync(adopt.editOneSmallandfurry)) 
router.put('/smallandfurries/:id', isLoggedIn,isSmallandfurryOwner,catchAsync(adopt.updateOneSmallandfurry))
router.delete('/smallandfurries/:id',isLoggedIn, isSmallandfurryOwner,catchAsync(adopt.deleteOneSmallandfurry))


//OTHER
router.get('/others', catchAsync(adopt.getOthers))
router.get('/others/:id', catchAsync(adopt.getOneOther))
router.post('/others/:id', catchAsync(adopt.adoptOther))
router.get('/others/:id/edit',isLoggedIn ,isOtherOwner,catchAsync(adopt.editOneOther)) 
router.put('/others/:id', isLoggedIn,isOtherOwner,catchAsync(adopt.updateOneOther))
router.delete('/others/:id',isLoggedIn , isOtherOwner,catchAsync(adopt.deleteOneOther))





router.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode)
    res.render('error', {err});
})

module.exports = router;