const { Sequelize, Model, DataTypes, Op, QueryTypes } = require('sequelize');

// Connection configuration
let sequelizeCon = new Sequelize("mysql://root:@localhost:3306/employee_api");

// Test the connection
sequelizeCon.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = {
    sequelizeCon,
    Model,
    DataTypes,
    Op,
    QueryTypes,
};