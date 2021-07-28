const express = require("express");
const router = express.Router();
const Telephone = require("./Telephone");

router.get("/phones/new/:id", (req, res) => {
    var id = req.params.id;
    res.render("phones/new", { id: id });
});

router.post("/phone/save", (req, res) => {
    var id = req.body.id;
    var number = req.body.number;

    Telephone.create({
        number: number,
        contactId: id
    }).then(() => {
        res.redirect("/contacts");
    });
});

module.exports = router;