const mongoose = require("mongoose"),
    bookschema = mongoose.Schema({
        name: String,
        author: String,
        link: String,
        hid: String
    });
module.exports = mongoose.model("books", bookschema)