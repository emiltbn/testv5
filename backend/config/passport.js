const passport = require('passport');

// Import
require('./localStrategy')(passport);
require('./jwtStrategy')(passport);


module.exports = passport;