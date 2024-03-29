const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    industry: String
});

module.exports = mongoose.model('customer', customerSchema); // module.exports explain were going to export from file for when we import them or require them in other files such as app.js