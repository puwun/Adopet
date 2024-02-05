const Dog = require('../models/pets/dog');
const Cat = require('../models/pets/cat');
const Bird = require('../models/pets/bird');
const Smallandfurry = require('../models/pets/saf');
const Other = require('../models/pets/other');
const { sendOwnerMail, sendAdopterMail} = require('./sendMail');


module.exports.index = (req, res) => { 
    res.render('../views/adopt/index')
}

//DOGS
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
    // console.log('----------------------');
    // console.log(dog);
    // console.log('----------------------');
    // console.log(dog.owner.username );
    // console.log('----------------------');
    // console.log(req.files);

    res.render('../views/adopt/doggies/show', {dog});
}

module.exports.editOneDog = async(req,res) =>{
    const { id } = req.params;
    const dog = await Dog.findById(id);
    if(!dog){
        res.flash('error', 'Cannot find that dog!');
        return res.redirect('/adopt/dogs');
    }
    res.render('../views/adopt/doggies/edit', {dog})
}

// module.exports.searchDog = async(req, res) => {
//     const { key } = req.query;
//     console.log(key);
//     try{
//     const data = await Dog.find({
//         $or: [
//             {name: {$regex: key, $options: 'i'}}, //case-insensitive
//             {breed: {$regex: key, $options: 'i'}},
//             {description: {$regex: key, $options: 'i'}},
//             //and other attributes
//         ]
//     })
//     // console.log(data);
//     // res.send(data);
//     console.log(data);
//     res.send(data);}
//     catch(e){
//         console.log(`error is ${e}`);
//     }
//     // res.render('../views/adopt/doggies/search', {data})

// }
module.exports.searchDog = async(req, res) => {
    // const { name, breed } = req.query;
    console.log('____________0___________');
    // console.log({name, breed});
    console.log('____________1___________');
    console.log(req.query);
    try{
    const data = await Dog.find(req.query);
    console.log('-----------2-------------');
    console.log({data});
    console.log('----------3--------------');
    // res.send(data);
    console.log(data);
    res.json({data});}
    catch(e){
        console.log(`error is ${e}`);
    }
    // res.render('../views/adopt/doggies/search', {data})

}

module.exports.updateOneDog = async(req, res) =>{
    const { id } = req.params;
    const dog = await Dog.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/adopt/dogs/${dog._id}`)
}

module.exports.deleteOneDog = async(req,res) => {
    const { id } = req.params;
    await Dog.findByIdAndDelete(id);
    res.redirect('/adopt/dogs'); 
}



//CATS
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

module.exports.editOneCat = async(req,res) =>{
    const { id } = req.params;
    const cat = await Cat.findById(id);
    if(!cat){
        res.flash('error', 'Cannot find that cat!');
        return res.redirect('/adopt/cats');
    }
    res.render('../views/adopt/kitties/edit', {cat})
}


module.exports.updateOneCat = async(req, res) =>{
    const { id } = req.params;
    const cat = await Cat.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/adopt/cats/${cat._id}`)
}

module.exports.deleteOneCat = async(req,res) => {
    const { id } = req.params;
    await Cat.findByIdAndDelete(id);
    res.redirect('/adopt/cats'); 
}



//BIRDS
module.exports.getBirds = async(req, res) => { 
    let birdies = await Bird.find({});
    console.log(req.body)
    res.render('../views/adopt/birdies/birds', {birdies})
}

module.exports.getOneBird = async(req, res) => {
    const { id } = req.params;
    const bird = await Bird.findById(id).populate('owner');
    //const bird = await Bird.find({pet: 'dog',_id : id}).populate('owner');
    // console.log(bird);
    res.render('../views/adopt/birdies/show', {bird});
}

module.exports.editOneBird = async(req,res) =>{
    const { id } = req.params;
    const bird = await Bird.findById(id);
    if(!bird){
        res.flash('error', 'Cannot find that bird!');
        return res.redirect('/adopt/birds');
    }
    res.render('../views/adopt/birdies/edit', {bird})
}

module.exports.updateOneBird = async(req, res) =>{
    const { id } = req.params;
    const bird = await Bird.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/adopt/birds/${bird._id}`)
}

module.exports.deleteOneBird = async(req,res) => {
    const { id } = req.params;
    await Bird.findByIdAndDelete(id);
    res.redirect('/adopt/birds'); 
}



//SMALLANDFURRIES
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

module.exports.editOneSmallandfurry = async(req,res) =>{
    const { id } = req.params;
    const smallandfurries = await Smallandfurry.findById(id);
    if(!smallandfurries){
        res.flash('error', 'Cannot find that smallandfurry!');
        return res.redirect('/adopt/smallandfurries');
    }
    res.render('../views/adopt/sandf/edit', {smallandfurries})
}

module.exports.updateOneSmallandfurry = async(req, res) =>{
    const { id } = req.params;
    const smallandfurries = await Smallandfurry.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/adopt/smallandfurries/${smallandfurries._id}`)
}

module.exports.deleteOneSmallandfurry = async(req,res) => {
    const { id } = req.params;
    await Smallandfurry.findByIdAndDelete(id);
    res.redirect('/adopt/smallandfurries'); 
}


//OTHERs
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


module.exports.updateOneOther = async(req, res) =>{
    const { id } = req.params;
    const other = await Other.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/adopt/others/${other._id}`)
}

module.exports.deleteOneOther = async(req,res) => {
    const { id } = req.params;
    await Other.findByIdAndDelete(id);
    res.redirect('/adopt/others'); 
}


module.exports.adoptDog = async(req, res) => {
    //username, phone, email, petInfo
    const dog = await Dog.findById(req.params.id).populate('owner')
    const ownerName = dog.owner.username ;
    const ownerEmail = dog.owner.email;
    const ownerPhone = dog.owner.phone;
    sendAdopterMail(req.user.username,req.user.email,"dog",ownerName,ownerEmail,ownerPhone);
    res.redirect('/adopt');
}

module.exports.adoptCat = async(req, res) => {
    //username, phone, email, petInfo
    const cat= await Cat.findById(req.params.id).populate('owner')
    const ownerName = cat.owner.username ;
    const ownerEmail = cat.owner.email;
    const ownerPhone = cat.owner.phone;
    sendAdopterMail(req.user.username,req.user.email,"cat",ownerName,ownerEmail,ownerPhone);
    res.redirect('/adopt');
}

module.exports.adoptBird = async(req, res) => {
    //username, phone, email, petInfo
    const bird = await Bird.findById(req.params.id).populate('owner')
    const ownerName = bird.owner.username ;
    const ownerEmail = bird.owner.email;
    const ownerPhone = bird.owner.phone;
    sendAdopterMail(req.user.username,req.user.email,"bird",ownerName,ownerEmail,ownerPhone);
    res.redirect('/adopt');
}

module.exports.adoptOther = async(req, res) => {
    //username, phone, email, petInfo
    const other = await Other.findById(req.params.id).populate('owner')
    const ownerName = other.owner.username ;
    const ownerEmail = other.owner.email;
    const ownerPhone = other.owner.phone;
    sendAdopterMail(req.user.username,req.user.email,"other",ownerName,ownerEmail,ownerPhone);
    res.redirect('/adopt');
}

module.exports.adoptSmallandfurry = async(req, res) => {
    //username, phone, email, petInfo
    const smallandfurry = await Smallandfurry.findById(req.params.id).populate('owner')
    const ownerName = smallandfurry.owner.username ;
    const ownerEmail = smallandfurry.owner.email;
    const ownerPhone = smallandfurry.owner.phone;
    sendAdopterMail(req.user.username,req.user.email,"smallandfurry",ownerName,ownerEmail,ownerPhone);
    res.redirect('/adopt');
}