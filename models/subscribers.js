const {  DataTypes } = require('sequelize');
const db=require("./db");

const Subscribers = db.define('subscribers', {
    subscriber_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
       
    },
    sur_name:{
        type:DataTypes.STRING(5),
       
       
    },
    name:{
        type:DataTypes.STRING(),
      
       
    },
   dob:{
    type:DataTypes.STRING,
  
   },
    doj:{
        type:DataTypes.STRING,
        allowNull:false
    },
    adhaar_num:{
        type:DataTypes.STRING,
        unique:true,
    },
    pan_num:{
        type:DataTypes.STRING,
        unique:true,
    },
    house_name:{
        type:DataTypes.STRING,
    },
    street:{
        type:DataTypes.STRING,
    },
    place:{
        type:DataTypes.STRING,
    },
    po:{
        type:DataTypes.STRING,
    },
    pin:{
        type:DataTypes.STRING,
    },
    district:{
        type:DataTypes.STRING,
    },
    state:{
        type:DataTypes.STRING,
    },
    country:{
        type:DataTypes.STRING,
    },
    parent_id:{
        type:DataTypes.STRING,
    },
    position_id : {
        type:DataTypes.STRING,
    },
    wallet_balance:{
        type:DataTypes.STRING,
    },
    account_num:{
        type:DataTypes.STRING,
    },
    account_holder_name:{
        type:DataTypes.STRING,
    },
    bank_name:{
        type:DataTypes.STRING,
    },
    ifsc_code:{
        type:DataTypes.STRING,
    },
    house_name:{
        type:DataTypes.BOOLEAN,
    }
});

module.exports=Subscribers;