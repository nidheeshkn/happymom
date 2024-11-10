const {  DataTypes } = require('sequelize');
const db=require("./db");

const Position = db.define('positions', {
    position_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    position_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    position_rank:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    gross_wallet:{
        type:DataTypes.INTEGER,
        allowNull:true,
       
    },
    total_subscribers:{
        type:DataTypes.INTEGER,
        allowNull:true,
       
    },
    total_subordinates:{
        type:DataTypes.INTEGER,
        allowNull:true,
     
    }
});

module.exports=Position;