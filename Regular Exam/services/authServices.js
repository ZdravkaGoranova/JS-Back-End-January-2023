const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken.js');
const { SECRET } = require('../constans.js')

exports.findByUsername = (username) => User.findOne({ username });//User.exists({username})
exports.findByEmail = (email) => User.findOne({ email });//User.exists({email})

exports.register = async (username,email, password, confirmPassword) => {

    if (password !== confirmPassword) {
        throw new Error('Password missmatc!');
    }
    //TODO:Check user exists
    //const existingUser = await this.findByUsername(username);
    const existingUser = await User.findOne({
        $or: [
            { username },
              { email }
        ]
    });

    if (existingUser) {
        throw new Error('User  exists!');
    }

    if (username.length < 2) {
        throw new Error('Username is too short!');
    }

    if (email.length < 10) {
        throw new Error('Username is too short!');
    }


    if (password.length < 4) {
        throw new Error('The password should be at least four characters long!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username,email, password: hashPassword});

    return this.login(username, password);
};


exports.login = async (username, password) => {

    //Email/User exist
    const user = await this.findByUsername(username);
    console.log(user)
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    //Password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password!');
    };

    //Generated token
    const payload = {
        _id: user._id,
        username: user.username,
       // address: user.address
    };

    const token = await jwt.sing(payload, SECRET);

    return token;
}

