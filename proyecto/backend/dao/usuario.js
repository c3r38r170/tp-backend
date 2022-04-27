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
    var updateUsuario = {
        title: usuario.title,
        technologies: usuario.technologies,
        description: usuario.description,
        budget: usuario.budget,
        contact_email: usuario.contact_email
    };
    return Usuario.update(updateUsuario, { where: { id } });
}
module.exports = usuarioDao;