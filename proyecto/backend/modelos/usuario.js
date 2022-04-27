
const Sequelize = require('sequelize');
const db = require('../datos/db');

const Usuario = db.define('usuario', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DNI: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contrasenia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Usuario;