const jwt = require('../lib/jsonWebToken.js');
const { SECRET } = require('../constans.js');

exports.authentication = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.isAuthenticated = decodedToken;
            res.locals.user = decodedToken;

        } catch (err) {
            res.clearCookie('auth');

            return res.status(401).render('home/404');
        }
    }
    //req.user = {};ako e undefinde да върне false
    next();
};

exports.isAuth = async (req, res, next) => {

    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};


const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        // user is authenticated, allow access to route
        next();
    } else {
        // user is not authenticated, redirect to ArtGallery page
        res.redirect('/');
    }
};


exports.requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        // user is authenticated, allow access to route
        next();
    } else if (req.path === '/login' || req.path === '/register') {
        // allow access to login and register pages
        next();
    } else if (req.path === '/artGallerys/:bookId/delete' || req.path === '/artGallerys/:bookId/edit' ) {
        // check if user is authenticated and has permission to access dashboard and admin pages
        if (req.session && req.session.userId && req.session.isAdmin) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        // user is not authenticated, redirect to login page
        res.redirect('/');
    }
};