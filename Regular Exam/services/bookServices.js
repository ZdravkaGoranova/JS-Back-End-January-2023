const Photo = require('../models/Photo.js');
const User = require('../models/User.js');

const bookUtils = require('../utils/bookUtils.js');

exports.search = async (name, paymentMethod) => {

    let cprypto = await this.getAll();

    if (name) {
        cprypto = cprypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if (paymentMethod) {
        cprypto = cprypto.filter(x => x.paymentMethod == paymentMethod)
    }
    return cprypto;
};

exports.getAll = () => Photo.find({}).lean();

exports.create = (ownerId, cryptoData) => Photo.create({ ...cryptoData, owner: ownerId });

exports.getOne = (bookId) => Photo.findById(bookId).lean();

exports.update = (bookId, data) => Photo.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Photo.findByIdAndDelete(bookId);

///////

exports.commentPhoto = (photoId, userId, comment) => Photo.findByIdAndUpdate(photoId, { $push: { commentList: { userId, comment } } });
exports.getOnePhoto = (photoId) => Photo.findById(photoId).populate('owner').populate('commentList.userId').lean();
exports.comment = async (userId, comment, photoId) => {
    const photo = await Photo.findById(photoId);
    photo.commentList.push(userId, comment);

    return photo.save();
};

////////////////


exports.getMyWishBook = (userId) => Photo.find({ wishingList: userId }).lean();

exports.getUsername = (userId) => User.findById(userId).lean();
exports.getUser = (userId) => User.findById(userId).lean();
//exports.getUsername = (userId) => User.find({ username: userId }).lean();

exports.getMyusersShared = (userId) => Photo.find({ usersShared: userId }).lean();

exports.getmyPhotos = (userId) => Photo.find({ owner: userId }).lean();

/////////////



exports.getAdress = (userId) => User.findById(userId).lean().populate({ path: 'username' });

exports.wish = async (userId, bookId, req, res) => {
    const publication = await Photo.findById(bookId);
    const isOwner = publication.owner == req.user._id;
    const isWish = publication.wishingList?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    publication.wishingList.push(userId);
    return await publication.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};




exports.shared = async (userId, bookId, req, res) => {
    const publication = await Photo.findById(bookId);
    const isOwner = publication.owner == req.user._id;
    const isWish = publication.usersShared?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    publication.usersShared.push(userId);
    return await publication.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};


//     const isWish  = book.wishingList?.filter(id => id == req.user?._id);