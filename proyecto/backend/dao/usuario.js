const Usuario = require('../modelos/usuario');
var usuarioDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUsuario: updateUsuario
}

function findAll() {
    return Usuario.findAll();
}

function findById(id) {
    return Usuario.findByPk(id);
}

function deleteById(id) {
    return Usuario.destroy({ where: { id } });
}

function create(usuario) {
    var newUsuario = new Usuario(usuario);
    return newUsuario.save();
}

function updateUsuario(usuario, id) {
    return Usuario.update(usuario, { where: { id } });
}
module.exports = usuarioDao;