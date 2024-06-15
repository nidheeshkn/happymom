const {  DataTypes } = require('sequelize');
const db=require("./db");

const withdrawalRequests = db.define('withdrawal_requests', {
    request_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    subscriber_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    request_amount:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    gross_amount:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    current_balance:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    redeemable_amount:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    allowed_amount:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    request_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    request_status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    transsaction_id:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    transferd_date:{
        type:DataTypes.DATE,
        allowNull:true,
       
    },
    remark:{
        type:DataTypes.DATE,
        allowNull:true,
     
    }
});

module.exports=withdrawalRequests;