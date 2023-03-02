const jwt = require('jsonwebtoken');
const util = require('util');

exports.sing = util.promisify(jwt.sign);
exports.verify = util.promisify(jwt.verify);

