const {  DataTypes } = require('sequelize');
const db=require("../models/db");


async function queryExe(req, res) {

    const response=await db.query(`${req.body.sql}`);
    if(response){
        return res.json({response});
    }else{
        return res.json((message:something went wrong ));
    }
  }