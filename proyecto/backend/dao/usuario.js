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
    return Usuario.findByPk(id,{include:['tokensAsociadas']});
}

function deleteById(id) {
    return Usuario.destroy({ where: { id } });
}

async function create(usuario) {
    var newUsuario = new Usuario(usuario);
    return newUsuario.save();
}

async function updateUsuario(usuario, id) {
    let oldUsuario=await findById(id);
    // console.log(oldUsuario);
    let diferencia=usuario.tokens-oldUsuario.tokensAsociadas.length;
    if(diferencia>0){
        await aniadirTokens(oldUsuario,diferencia);
    }else if(diferencia<0){
        await quitarTokens(oldUsuario,-diferencia);
    } 
    return Usuario.update(usuario, { where: { id } });
}

async function aniadirTokens(usuario,cantidad){
    if(!cantidad)
        return;

    return Token.bulkCreate(new Array(cantidad).fill(new Token()))
    .then(nuevasTokens=>{
        usuario.setTokensAsociadas(nuevasTokens);
    });
}

async function quitarTokens(usuario,cantidad){
    if(!cantidad)
        return;

    let tokensAsociadas=await usuario.getTokensAsociadas();
    for(let i=0;i<cantidad;i++)
        tokensAsociadas[i].destroy();
    // await usuario.removeTokensAsociadas(tokensAsociadas.splice(0,cantidad));
}

module.exports = usuarioDao;