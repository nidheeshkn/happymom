const {  DataTypes } = require('sequelize');
const db=require("./db");

const WalletHistories = db.define('wallet_histories', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    subscriber_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
       
    },
    new_subscriber_id:{
        type:DataTypes.INTEGER,
       
       
    },
    added_by:{
        type:DataTypes.INTEGER,
       
       
    },
    debit:{
        type:DataTypes.INTEGER,
        allowNull:true,
       
    },
    credit:{
        type:DataTypes.INTEGER,
        allowNull:true,
       
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    fee_payment_id:{
        type:DataTypes.STRING,
       
       
    },
    transaction_id:{
        type:DataTypes.STRING,
              
    },
});

module.exports=WalletHistories;