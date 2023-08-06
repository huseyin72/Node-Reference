const sequelize = require('../utility/database');
const Sequelize = require('sequelize');


const Category = sequelize.define('category',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull : false
    },
    name: Sequelize.STRING,
    description:{
        type:Sequelize.STRING,
        allowNull:true
    }

})
module.exports = Category;