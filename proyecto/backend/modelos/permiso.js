
const Sequelize = require('sequelize');
const db = require('../datos/db');

const Permiso = db.define('permiso', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Permiso.sync();

module.exports = {Permiso};