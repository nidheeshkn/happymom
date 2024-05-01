
const wallet = require('../models/wallet')
const Subscribers = require('../models/subscriber');
const Users = require('../models/user');




async function courseList(req, res) {

  console.log(req.user);

  // req.user.userId=req.body.subscriber_id;
  if (req.user.userId) {
    const user_data = await Users.findOne({ where: { id: req.user.userId } });
    console.log(user_data);
    user_data.password=null;
    
    res.json({user_data});
  } else {

    res.json({ message: "invalid User" });


  }
}

 

  module.exports = {  courseList }