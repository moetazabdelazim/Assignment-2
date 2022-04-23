module.exports = {
    create: (req, res, next) => {
        let bookParams = {
            name: req.body.name, 
            Author: req.body.Author,
            amazon: req.body.amazon
        };

        book.create(bookParams)
            .then(Book => {
                res.locals.redirect = "/home";
                res.locals.Book = Book;
                next();   
            })
            .catch(error =>{
                console.log(`Error saving Book: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect; 
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
}