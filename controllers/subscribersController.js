
const Subscribers = require('../models/subscriber');
const Users = require('../models/user');


async function subscribersData(req, res) {

  console.log(req.session.session_id)
  const subscribers_data = await Subscribers.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(subscribers_data);
  res.send(subscribers_data)
}


async function subscribersHome(req, res) {
    console.log("inside sub home")
    console.log(req.user);
    // console.log(req.body.subscriber_id);
    // const subscribers_data = await Subscribers.findAll();
    // Getting user data for the person who send the registration link
    const user_data = await Users.findOne({ where: { id: req.user.userId } });
    console.log(user_data);
    const subscriber_data = await Subscribers.findOne({ where: { subscriber_id: req.user.userId } });
    // console.log(subscriber_data);
    const subordinate_data = await Subscribers.findAll({ where: { parent_id: subscriber_data.subscriber_id } });
    // console.log(subordinate_data);
    res.json({subscriber_data,subordinate_data,user_data});
  }

  async function viewSubscriber(req, res) {
    console.log("inside view sub");
    console.log(req.user);
    console.log(req.body.subscriber_id);
 
    const user_data = await Users.findOne({ where: { id: req.user.userId } });
    console.log(user_data);
    const my_data = await Subscribers.findOne({ where: { subscriber_id: req.user.userId } });
    console.log(my_data.name);
    const child_data = await Subscribers.findAll({ where: { parent_id: subscriber_data.subscriber_id } });


    // console.log(subordinate_data);
    res.json({subscriber_data,subordinate_data,user_data});
  }

  module.exports={subscribersData,subscribersHome,viewSubscriber}