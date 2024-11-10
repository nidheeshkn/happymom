const {  DataTypes } = require('sequelize');
const db=require("./db");

const Incentive = db.define('incentives', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

});

module.exports=Incentive;