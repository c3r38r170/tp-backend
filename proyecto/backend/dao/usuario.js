const {Usuario,Token} = require('../modelos/usuario');
const {Permiso,UsuarioPermiso} = require('../modelos/permiso');
const permisoDao = require('./permiso');
const Sequelize =require('sequelize');
var usuarioDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUsuario: updateUsuario
    ,enviarTokens
    ,findFuzzilyByName
}

async function permisosIDsAPermisos(permisosIDs){
    let permisosReales=[];
    for(let {ID:permisoID} of permisosIDs) {
        permisosReales.push(
            await permisoDao.findById(permisoID)
        );
    }
    return permisosReales;
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
            // ,attributes: incluirTokensAsociadas?['ID']:[]
            ,as:'tokensAsociadas'
        },Permiso]
        ,attributes
    }

    if(incluirContrasenia)
        attributes.push('contrasenia');
    if(incluirHabilitado)
        attributes.push('habilitado');
    if(!incluirTokensAsociadas){
        // attributes.push([Sequelize.fn('count', Sequelize.col('tokensAsociadas.ID')), 'tokens']);
        // findOptions.group=['usuario.ID'];
    }

    findOptions.attributes = attributes;
    return Usuario.findAll(findOptions).then(usuarios=>{
        return usuarios.map(usuario=>{
            // TODO DRY
            usuario.setDataValue('tokens',usuario.tokensAsociadas.length);
            return usuario;
        })
    });
}

async function findById(id) {
    let usuario=await Usuario.findByPk(id,{
        include:[{
            model:Token
            ,as:'tokensAsociadas'
        },Permiso]
        ,attributes:[
            'ID'
            ,'nombreCompleto'
            ,'nombreUsuario'
            ,'DNI'
            ,'correo'
            // ,[Sequelize.fn('count', Sequelize.col('tokensAsociadas.ID')), 'tokens']
        ]
    });
    usuario.setDataValue('tokens',usuario.tokensAsociadas.length);
    return usuario;
}

function deleteById(id) {
    return Usuario.destroy({ where: { id } });
}

async function create(usuario) {
    usuario.tokensAsociadas=new Array(+usuario.tokens).fill({});
    let permisos=usuario.permisos;
    delete usuario.permisos;

    let nuevoUsuario=await Usuario.create(usuario,{
        include:[{
            model:Token
            ,as:'tokensAsociadas'
        },Permiso]
    });

    let permisosReales=await permisosIDsAPermisos(permisos)
    await nuevoUsuario.setPermisos(permisosReales);
    await nuevoUsuario.save();
    return findById(nuevoUsuario.ID);
}

async function updateUsuario(usuario, id) {
    
    let oldUsuario=await findById(id);
    let diferencia=usuario.tokens-oldUsuario.tokensAsociadas.length;
    if(diferencia>0){
        await aniadirTokens(oldUsuario,diferencia);
    }else if(diferencia<0){
        await quitarTokens(oldUsuario,-diferencia);
    }
    
    usuario.permisos=permisosIDsAPermisos(usuario.permisos);

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

async function enviarTokens(emisorID,receptorID,cantidad){
    let emisor=await findById(emisorID);
    let receptor=await findById(receptorID);
    
    let tokensEnJuego=await emisor.getTokensAsociadas();
    receptor.addTokensAsociadas(tokensEnJuego.slice(0,cantidad));
    
    return receptor.save();
}

async function findFuzzilyByName(consulta){
    return Usuario.findAll({
        where:{
            nombreCompleto:{
                [Sequelize.Op.like]:`%${consulta}%`
            }
        }
    });
}

module.exports = usuarioDao;