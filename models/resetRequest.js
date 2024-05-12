const {  DataTypes } = require('sequelize');
const db=require("./db");

const passwordRequests = db.define('password_requests', {
    request_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    subscriber_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    request_link:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    request_status:{
        type:DataTypes.STRING,
        allowNull:true,
       
    },
    request_date:{
        type:DataTypes.DATE,
        allowNull:true,
       
    },
    expiry_date:{
        type:DataTypes.DATE,
        allowNull:true,
     
    }
});

module.exports=passwordRequests;