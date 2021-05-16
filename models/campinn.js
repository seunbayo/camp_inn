const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campinnSchema = new.Schema({
    title: String,
    price: String,
    description: String,
    location: String
});


module.exports = mongoose.model('campinn', campinnSchema)

