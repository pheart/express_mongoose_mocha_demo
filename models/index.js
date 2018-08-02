const mongoose = require('mongoose');

// import all schema
require('./user');

exports.User = mongoose.model('user');

