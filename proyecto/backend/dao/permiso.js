const {Permiso} = require('../modelos/permiso');
var permisoDao = {
    findAll: findAll
}

function findAll() {
    return Permiso.findAll();
}

module.exports = permisoDao;