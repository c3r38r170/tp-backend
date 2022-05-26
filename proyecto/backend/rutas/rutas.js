const router = require('express').Router()
//const conexion = require('./config/conexion')

router.get('/status',function (req, res) {
    res.status(200).json({ status: "UP" });
})

const usuarioRouter = require('./usuario');

router.use('/usuarios', usuarioRouter);

module.exports = router