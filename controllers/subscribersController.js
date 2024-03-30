
const Subscribers = require('../models/subscribers');


async function subscribersData(req, res) {

  console.log(req.session.session_id)
  const subscribers_data = await Subscribers.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(subscribers_data);
  res.send(subscribers_data)
}


async function subscribersHome(req, res) {

    console.log(req.session.session_id)
    // const subscribers_data = await Subscribers.findAll();
    const subscriber_data = await Subscribers.findOne({ where: { subscribers_id: req.body.subscriber_id } });
    console.log(subscriber_data);
    res.send(subscriber_data)
  }

  module.exports={subscribersData}