const router = require('express').Router();

const Photo = require('../models/Photo.js');
const bookServices = require('../services/bookServices.js');

const bookUtils = require('../utils/bookUtils.js');


router.get('/', async (req, res) => {

    //const publication  = await Publication.find().limit(10);
    const photos = await Photo.find()
    console.log(photos)

    // const publicationData = publication.map(pub => ({ title: pub.title, usersShared: pub.usersShared.length }));

    // console.log(publicationData)


    // console.log(req.user)
    res.render('home/index', { photos })
});


router.get('/catalog', async (req, res) => {//

    // const pet = await bookServices.getOne(req.params.bookId);
    // console.log(pet)
    // //console.log(pet._id)

    // const ownerId = pet.owner
    // console.log(ownerId)
    // // console.log(req.user._id)

    // const userData = await bookServices.getUser(ownerId)
    // console.log(userData)


    const photos = await bookServices.getAll().populate('owner');
    console.log(photos)


    
    //let photos = await Photo.find().lean();
    //console.log(photos)

    // const owners = photos.map(pet => pet.owner);
    // console.log(owners);

    // res.render('index', { cubes, search, difficultyFrom, diffficultyTo });
    res.render('book/catalog', { photos });

});
router.get('/search', async (req, res) => {

    const { name, paymentMethod } = req.query;
    const publication = await bookServices.search(name, paymentMethod);
    const paymentMethods = bookUtils.generatePaymentMethod(paymentMethod);

    res.render('home/search', { publication, paymentMethods, name });

});

module.exports = router;