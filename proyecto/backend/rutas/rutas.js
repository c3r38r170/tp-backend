const router = require('express').Router()
//const conexion = require('./config/conexion')

router.get('/status',function (req, res) {
    res.status(200).json({ status: "UP" });
})

const usuario = require('./usuario');

router.use('/usuario', usuario);

module.exports = router