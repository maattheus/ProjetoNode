const Sequelize = require("sequelize");
const connection = require("../database/database");

const Contact = connection.define('contacts', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Contact.sync({ force: true });

module.exports = Contact;