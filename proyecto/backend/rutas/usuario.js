const router = require('express').Router()
const usuarioController = require('../controlador/usuario');

//https://medium.com/techno101/crud-using-node-js-express-and-sequelize-82c10ef3b346

router.get('/:id',usuarioController.findUsuarioById)

router.post('/',usuarioController.addUsuario)

router.delete('/:id',usuarioController.deleteById)

router.put('/:id',usuarioController.updateUsuario)

router.get('/',usuarioController.findUsuarios)

module.exports = router