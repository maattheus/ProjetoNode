const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const Contact = require("./contact/Contact");
const Telephone = require("./telephone/Telephone");

const ContactsController = require("./contact/ContactsController");
const PhonesController = require("./telephone/PhonesController");


// view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso")
}).catch((error) => {
    console.log(error);
});


app.use("/", ContactsController);
app.use("/", PhonesController);



app.get("/", (req, res) => {
    res.render("index");
});



app.listen(8000, () => {
    console.log("O servidor esta rodando");
})