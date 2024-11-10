const {  DataTypes } = require('sequelize');
const db=require("./db");

const withdrawalRequests = db.define('withdrawal_requests', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    subscriber_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    request_amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    request_type:{
        type:DataTypes.INTEGER,
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
    approved_amount:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    approved_by:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    request_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    request_status:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    transaction_id:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    transaction_date:{
        type:DataTypes.DATE,
        allowNull:true,
       
    },
    remark:{
        type:DataTypes.DATE,
        allowNull:true,
     
    }
});

module.exports=withdrawalRequests;