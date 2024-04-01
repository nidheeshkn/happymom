
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
    const subscriber_data = await Subscribers.findOne({ where: { subscriber_id: req.body.subscriber_id } });
    console.log(subscriber_data);
    const subordinate_data = await Subscribers.findAll({ where: { parent_id: subscriber_data.subscriber_id } });
    console.log(subordinate_data);
    res.json({subscriber_data,subordinate_data});
  }

  module.exports={subscribersData,subscribersHome}