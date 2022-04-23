const port = 3000,
    express = require ("express"),
    app = express();
    bookcontroller = require("./controllers/bookcontroller.js");
    bookcontroller2 = require("./controllers/bookcontroller2.js");
    layouts = require("express-ejs-layouts");
app.set("view engine", "ejs")
app.use(layouts);
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use((req,res,next) => {
    console.log(`request made to ${req.url}`);
    next();
});
const books = require("./models/book");
app
    .get("/home", (req, res) => {
        var myQuery = books.find();
        myQuery.exec((error, data) => {
            res.render("home", { test: data });
        });
    })
    .get("/books/:book", bookcontroller.sendReqParam,
    (req, res, next) => {
        console.log(req.data);
        res.render("books", { result: req.data });
    })
    .get("/addnewbook",
    (req, res) => {
        res.render("add");
    })

    .post("/book/create", 
    (req, res) => {
        let bookParams = {
            name: req.body.name, 
            author: req.body.author,
            link: req.body.link
        };
        var book1 = new book({name: bookParams.name, author: bookParams.author, link: bookParams.link})
        console.log(book1)
        var myQuery = books.create(book1);
        var myQuery = books.find();
        myQuery.exec((error, data) => {
            res.render("home", { test: data });
        });
    })
    .get("/delete", (req, res) => {
        var myQuery = books.find();
        myQuery.exec((error, data) => {
            res.render("delete", { test: data });
        });
    })
    .post("/deleted", 
    (req, res) => {
        let bookParams = {
            name: req.body.name, 
        };
        var myQuery = books.find({name:bookParams.name}).remove();
        myQuery.exec((error, data) => {
            var myQuery = books.find();
            myQuery.exec((error, data) => {
            res.render("home", { test: data });
        });
        });
    })
    .listen(port, () => {
        console.log(`started listneing on ${port}`)
    });


const mongoose = require("mongoose");
const book = require("./models/book");

mongoose.connect(
    "mongodb+srv://moetaz:Password@srt-521.dvuk1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {useUnifiedTopology: true}
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("mongodb connection");
});

var myQuery = books.findOne({'hid':'3'});
myQuery.exec((error, data) => {
    if (data) console.log(data);
});