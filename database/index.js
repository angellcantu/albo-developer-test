'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

Promise.promisifyAll(mongoose);

const config = {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    family: 4,
    useUnifiedTopology: true
};

module.exports.run = () => {
    let _mongoose = {};
    _mongoose.albo_test_developer = mongoose.createConnection(process.env.DATA_BASE, config);
    _mongoose.albo_test_developer.on('connected', () => console.log('Connected to Database successfully!!!'));
    global._mongoose = _mongoose;
};