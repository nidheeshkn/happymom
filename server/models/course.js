const {  DataTypes } = require('sequelize');
const db=require("./db");

const Course = db.define('courses', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    fees:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    link:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true,
    }
});

module.exports=Course;