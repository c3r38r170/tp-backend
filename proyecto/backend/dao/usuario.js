const {Usuario,Token} = require('../modelos/usuario');
const Sequelize =require('sequelize');
var usuarioDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUsuario: updateUsuario
}

function findAll({incluirContrasenia=false,incluirHabilitado=false,incluirTokensAsociadas=false}={}) {
    let attributes =[
        'ID'
        ,'nombreCompleto'
        ,'nombreUsuario'
        ,'DNI'
        ,'correo'
    ];
    let findOptions={
        include:[{
            model:Token
            ,attributes: incluirTokensAsociadas?['ID']:[]
            ,as:'tokensAsociadas'
        }]
        ,attributes
    }

    if(incluirContrasenia)
        attributes.push('contrasenia');
    if(incluirHabilitado)
        attributes.push('habilitado');
    if(!incluirTokensAsociadas){
        attributes.push([Sequelize.fn('count', Sequelize.col('tokensAsociadas.ID')), 'tokens']);
        findOptions.group=['usuario.ID'];
    }

    findOptions.attributes = attributes;
    return Usuario.findAll(findOptions);
}

function findById(id) {
    return Usuario.findByPk(id,{include:['tokens']});
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