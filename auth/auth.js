const User=require("../models/user");

async function auth(req,res,next){
console.log("inside auth middleware",req.body.mobile_number)

const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
const isLoggedIn = req.session.isLoggedIn;
const username = req.session.session_id;
console.log(result,isLoggedIn,username)
console.log('-------------------------------------');
if(username === result.dataValues.id && isLoggedIn){

  return next();
}else{
    return res.status(401).json({status:"failed",message:"valid Session is not found"});
}
}
module.exports=auth;