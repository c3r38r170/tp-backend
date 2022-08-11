const {Usuario,Token} = require('../modelos/usuario');
const {Permiso} = require('../modelos/permiso');
const {permisoDao} = require('./permiso');
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
    return Usuario.findByPk(id,{
        include:[{
            model:Token
            ,attributes: []
            ,as:'tokensAsociadas'
            ,group:['usuario.ID']
        },Permiso/* {
            model:Permiso
            // ,attributes: []
            // ,as:'tokensAsociadas'
            // ,group:['usuario.ID']
        } */]
        ,attributes:[
            'ID'
            ,'nombreCompleto'
            ,'nombreUsuario'
            ,'DNI'
            ,'correo'
            ,[Sequelize.fn('count', Sequelize.col('tokensAsociadas.ID')), 'tokens']
            // ,[Sequelize.fn('count', Sequelize.col('tokensAsociadas.ID')), 'permisos']
        ]
    });
}

function deleteById(id) {
    return Usuario.destroy({ where: { id } });
}

async function create(usuario) {
    usuario.tokensAsociadas=new Array(+usuario.tokens).fill({});
    console.log(usuario);
    return Usuario.create(usuario,{
        include:[{
            model:Token
            ,as:'tokensAsociadas'
        }]
    });
}

async function updateUsuario(usuario, id) {
    let oldUsuario=await findById(id);
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

async function enviarTokens(emisorID,receptorID,cantidad){
    // findById(em)
    let emisor=await findById(emisorID);
    let receptor=await findById(receptorID);
    
    let tokensEnJuego=await emisor.getTokensAsociadas();
    // console.log(tokensEnJuego)
    receptor.addTokensAsociadas(tokensEnJuego.slice(0,cantidad));
    
    /* for(let i=0;i<cantidad;i++){

        receptor.tokensAsociadas.push(emisor.tokensAsociadas[0])
        emisor.tokensAsociadas.splice(0,1);
    } */
    
    return Promise.all(
        [/* emisor.save(), */receptor.save()]
    );
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