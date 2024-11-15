const {  DataTypes } = require('sequelize');
const db=require("./db");
const Subscribers = require("../models/subscriber");


const User = db.define('users', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    mobile_number:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    email:{
        type:DataTypes.STRING,
        unique:false,
         allowNull:true,
    },
    link:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    }
});

User.hasOne(Subscribers, { foreignKey: 'subscriber_id' });

module.exports=User;