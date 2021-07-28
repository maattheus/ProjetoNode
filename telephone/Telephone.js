const Sequelize = require("sequelize");
const connection = require("../database/database");
const Contact = require("../contact/Contact");

const Telephone = connection.define('phones', {
    number: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Contact.hasMany(Telephone); // 1-m
Telephone.belongsTo(Contact);  // 1-1

//Telephone.sync({ force: true });

module.exports = Telephone