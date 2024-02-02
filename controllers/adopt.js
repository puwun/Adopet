const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');


module.exports.index = (req, res) => { 
    res.render('../views/adopt/index')
}

module.exports.getDogs = async(req, res) => { 
    let doggies = await Dog.find({});
    // let doggies = await Dog.find({});
    res.render('../views/adopt/doggies/dogs', {doggies})
}

module.exports.getOneDog = async(req, res) => {
    // const { id, pet } = req.params;
    // const dog = await Pet.find({pet: pet, _id: id}).populate('owner');
    // const dog = await Pet.findById(req.params.id).populate('owner');
    const dog = await Dog.findById(req.params.id).populate('owner');
    // const dog = await Dog.find({pet: 'dog',_id : id}).populate('owner');
    console.log('----------------------');
    console.log(dog);
    console.log('----------------------');
    console.log(dog.owner.username );
    console.log('----------------------');
    console.log(req.files);

    res.render('../views/adopt/doggies/show', {dog});
}

module.exports.getCats = async(req, res) => { 
    let kitties = await Cat.find({});
    res.render('../views/adopt/kitties/cats', {kitties})
}

module.exports.getOneCat = async(req, res) => {
    const { id } = req.params;
    const cat = await Cat.findById(id).populate('owner');
    // }
    // const dog = await Pet.find({pet: 'dog', _id: id}).populate('user');
    // console.log('----------------------');
    // console.log(cat);
    // console.log('----------------------');
    // const cat = await Pet.find({pet: 'cat', _id: id});
    // console.log(cat);
    res.render('../views/adopt/kitties/show', {cat});
}

module.exports.getBirds = async(req, res) => { 
    let birdies = await Bird.find({});
    console.log(req.body)
    res.render('../views/adopt/birdies/birds', {birdies})
}

module.exports.getOneBird = async(req, res) => {
    const { id } = req.params;
    const bird = await Bird.findById(id).populate('owner');
    //    const bird = await Bird.find({pet: 'dog',_id : id}).populate('owner');
    // console.log(bird);
    res.render('../views/adopt/birdies/show', {bird});
}

module.exports.getSmallandfurry = async(req, res) => { 
    let smallandfurries = await Smallandfurry.find({});
    res.render('../views/adopt/sandf/smallandfurries', {smallandfurries})
}

module.exports.getOneSmallandfurry = async(req, res) => {
    const { id } = req.params;
    const smallandfurries = await Smallandfurry.findById(id).populate('owner');
    // const smallandfurries = await Smallandfurry.findById(id); //dont know why but when i did only this then too the owner was populated but only the id was shown
    console.log(smallandfurries);
    res.render('../views/adopt/sandf/show', {smallandfurries});
}

module.exports.getOthers = async(req, res) => { 
    let other = await Other.find({});
    res.render('../views/adopt/others/other', {other})
}

module.exports.getOneOther = async(req, res) => {
    const { id } = req.params;
    const other = await Other.findById(id).populate('owner');
    console.log(other);
    res.render('../views/adopt/others/show', {other});
}