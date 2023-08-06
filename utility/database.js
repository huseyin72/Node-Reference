 const Sequelize = require('sequelize');

 const sequelize = new Sequelize('node_app','root','300201106',{
    host:'localhost',
    dialect:'mysql'
 });

 module.exports = sequelize;