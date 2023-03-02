
const router = require('express').Router();

const Photo = require('../models//Photo.js');
const User = require('../models/User.js');
const bookServices = require('../services/bookServices.js');
const bookUtils = require('../utils/bookUtils.js');
const { getErrorMessage } = require('../utils/errorUtils.js')
const { isAuth, authentication } = require('../middlewares/authMddleware.js');



exports.getCreateCrypto = (req, res) => {//router.get('/'create',isAuth,(req, res))=>{
    console.log(req.user);

    res.render('book/create');
};
exports.postCreateCrypto = async (req, res) => {
    // console.log(req.body);//Object на данните от url
    console.log(req.user);

    try {
        const { name, age, description, location, image } = req.body;

        let book = new Photo({
            name,
            age,
            description,
            location,
            image,

            owner: req.user._id,
        });
        console.log(book);
        await book.save();//запазва в db

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { myPets: book._id } },
            { new: true }
        );
        // console.log(user);

        //или 
        //await cryptoService.create(req.user._id, { name, image, price, description, paymentMethod })

    } catch (error) {
        console.log(error.message);
        //return res.render('auth/404');
        return res.status(400).render('book/create', { error: getErrorMessage(error) })
    }
    res.redirect('/catalog');
};

exports.getDetails = async (req, res) => {//router.get('/:cryptoId/details',(req,res)=>{)

    const pet = await bookServices.getOne(req.params.bookId).populate('owner').populate('commentList.userId');
    //console.log(pet)

    const isOwner = pet.owner._id == req.user?._id;
    //console.log(isOwner)

    const canComment = req.user?._id != pet.owner._id
    console.log(canComment)

    const comments = pet.commentList;
   // console.log(comments)

    const comment = req.body.comment;
   //console.log(req.body)
    console.log(comment)
    
    const petId = req.params.bookId;
    const userId = req.user?._id;
    await bookServices.commentPhoto(petId, userId, comment);


    //res.render('photo/details', { photo, isOwner, canComment, comments });

    //или 
    // const userId = req.user?._id;
    // const pet = await bookServices.getOne(req.params.bookId);
    // const ownerId = pet.owner
    // console.log(ownerId)
    // const userData = await bookServices.getUser(ownerId)
    // console.log(userData)
    // const isOwnerr = bookUtils.isOwner(req.user, pet);
    // console.log(isOwnerr)
    // const isWished = pet.usersShared?.some(id => id == req.user?._id);

    if (!pet) {
        return res.render('home/404');
    }

    res.render('book/details', { pet, isOwner, canComment, comments });
};

exports.getEditCrypto = async (req, res) => {

    const pet = await bookServices.getOne(req.params.bookId);
    //const paymentMethods = bookUtils.generatePaymentMethod(book.paymentMethod);

    if (!bookUtils.isOwner(req.user, pet)) {
        return res.render('home/404')// throw new Error('You are not an owner!');
    }

    res.render('book/edit', { pet });
};

exports.postEditCrypto = async (req, res) => {

    const { name, age, description, location, image } = req.body

    try {
        await bookServices.update(req.params.bookId, {
            name, age, description, location, image
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(400).render('book/edit', { error: getErrorMessage(error) })

    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
};

exports.getDeleteCrypto = async (req, res) => {
    const book = await bookServices.getOne(req.params.bookId);

    const isOwner = bookUtils.isOwner(req.user, book);
    console.log(isOwner)

    if (!isOwner) {
        return res.render('home/404');
    }

    await bookServices.delete(req.params.bookId);//await cryptoService.delete(crypto);
    res.redirect('/catalog');
};

exports.getWish = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.wish(req.user._id, req.params.bookId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
}


exports.getShared = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await bookServices.shared(req.user._id, req.params.bookId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/artGallerys/${req.params.bookId}/details`);
}



exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const user = req.user;
    // console.log(user)
    //console.log(userId)

    const userObject = await bookServices.getAdress(userId);
    console.log(userObject)

    let myPets = await bookServices.getmyPhotos(userId);
    console.log(myPets)
    console.log(myPets)
    // let myPublications = await bookServices.getmyPublications(userId);

    // console.log(user)
    //console.log(myPublications)
    //console.log(myusersShared)//ok


    res.render('book/profile', { user, myPets, userObject });

}








//     try {
//         const userI = req.user._id;
//         const user = req.user;
//         let books = await Book.find().lean();
//         // const wishArray  = books.wishingList?.filter(id => id == req.user?._id);

//        //const filteredArray = books.filter(book => book.wishingList.includes(new ObjectId('req.user._id')));
//        const filteredArray = books.filter(book => book.wishingList.includes('req.user._id'));

//         console.log(req.user._id)
//         console.log(filteredArray);

//         res.render('book/profile', { user, books });
//     } catch (error) {

//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
// }