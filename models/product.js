const sequelize = require('../utility/database');
const Sequelize = require('sequelize');

const Product = sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull : false
    },
    name: Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE, 
        allowNull:false
        
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:true
    }

});
module.exports = Product;