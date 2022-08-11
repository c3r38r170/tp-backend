
const Sequelize = require('sequelize');
const db = require('../datos/db');
const {Usuario}=require('./usuario');

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

const UsuarioPermiso = db.define('usuario_permiso');
Usuario.belongsToMany(Permiso, { through: UsuarioPermiso });
Permiso.belongsToMany(Usuario, { through: UsuarioPermiso });

UsuarioPermiso.sync();
Permiso.sync();

module.exports = {Permiso};