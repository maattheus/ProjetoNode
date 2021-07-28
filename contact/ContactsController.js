const express = require("express");
const router = express.Router();
const Contact = require("./Contact");
const Telephone = require("../telephone/Telephone")

router.get("/contacts", (req, res) => {

    Contact.findAll().then(contacts => {
        Telephone.findAll().then(phones => {
            res.render("contacts/index", {
                contacts: contacts,
                phones: phones
            });
        })
    });

});
router.get("/contacts/nomes", (req, res) => {

    Contact.findAll({
        raw: true, order: [
            ['firstName', 'ASC']
        ]
    }).then(contacts => {
        Telephone.findAll().then(phones => {
            res.render("contacts/filterName", {
                contacts: contacts,
                phones: phones
            });
        })
    });

});
router.get("/contacts/email", (req, res) => {

    Contact.findAll({
        raw: true, order: [
            ['email', 'ASC']
        ]
    }).then(contacts => {
        Telephone.findAll().then(phones => {
            res.render("contacts/filterEmail", {
                contacts: contacts,
                phones: phones
            });
        })
    });

});


router.get("/contacts/new", (req, res) => {
    res.render("contacts/new");
});

router.post("/contacts/save", (req, res) => {
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;
    var telephone = req.body.telephone;

    Contact.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone
    }).then(() => {
        res.redirect("/contacts");
    });
});

router.get("/contacts/edit/:id", (req, res) => {
    var id = req.params.id;
    var have = true;
    if (isNaN(id)) {
        res.redirect("/contacts");
    }

    Contact.findByPk(id).then(contact => {
        if (contact != undefined) {
            Telephone.findOne({
                where: {
                    contactId: contact.id
                }
            }).then(phone => {
                res.render("contacts/edit", { contact: contact, phone: phone, have: true });
            }).catch(erro => {
                res.render("contacts/edit", { contact: contact, have: false });
            });
        } else {
            res.redirect("/contacts");
        }
    }).catch(erro => {
        res.redirect("/contacts");
    })
});

router.post("/contacts/update", (req, res) => {
    var id = req.body.id;
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;
    var telephone = req.body.telephone;

    var telephone2 = req.body.telephone2;

    Contact.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        telephone: telephone
    }, {
        where: {
            id: id
        }
    });
    Telephone.update({
        number: telephone2
    }, {
        where: {
            contactId: id
        }
    }).then(() => {
        res.redirect("/contacts");
    })

})

router.post("/contacts/delete", (req, res) => {
    var id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {

            Telephone.destroy({
                where: {
                    contactId: id
                }
            })

            Contact.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/contacts");
            })

        } else {
            res.redirect("/contacts");
        }
    } else {
        res.redirect("/contacts");
    }

})

module.exports = router;