const {  DataTypes } = require('sequelize');
const db=require("./db");

const withdrawalRequestsStatuses = db.define('withdrawal_requests_statuses', {
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

module.exports=withdrawalRequestsStatuses;