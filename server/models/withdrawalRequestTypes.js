const {  DataTypes } = require('sequelize');
const db=require("./db");

const withdrawalRequestsTypes = db.define('withdrawal_requests_types', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    description:{
        type:DataTypes.STRING,
        allowNull:true,
    },

    added_by:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },

    active:{
        type:DataTypes.STRING,
        allowNull:false,
    }

});

module.exports=withdrawalRequestsTypes;