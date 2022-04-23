const books = require("../models/book");

exports.sendReqParam = (req, res, next) => {
        let book = req.params.book;
        console.log(book)
        books.findOne({
                hid: book
            }, (error, books) => {
                if(error) next(error);
                req.data=books;
                next();
        });
};
