const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
module.exports= new Sequelize('ttads', 'root', 'password', {
  host: 'localhost',
  dialect: 'mariadb'
});