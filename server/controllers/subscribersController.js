const Subscribers = require("../models/subscriber");
const Users = require("../models/user");
const url = require('url');
const { Op } = require('sequelize');



async function searchSubscriber(req, res) {

  console.log(req.body);
  const searchQuery=req.body.params.searchQuery;

  // const subscribersData = await Users.findAll({
  //   attributes: ['id', 'mobile_number'],
  //   where: {
  //     [Op.or]: [
  //       { mobile_number: { [Op.like]: `${searchQuery}%` } },
  //       {
  //         include: {
  //           model: Subscribers,
  //           where: {
  //             name: { [Op.like]: `${searchQuery}%` }
  //           }
  //         }
  //       }
  //     ]
  //   },
  //   include: [{
  //     model: Subscribers,
  //     attributes: ['name']
  //   }]
  // });

  const subscribersData= await Users.findAll({
    attributes: ['id', 'mobile_number'],
    where: {
      [Op.or]: [
        { mobile_number: { [Op.like]: `${searchQuery}%` } },
        // { isActive: true }
      ]
    },
    include: [{
      model: Subscribers, // will create a left join
      attributes: ['name'],
    }]
  });



  console.log(subscribersData);
  res.send(subscribersData);
}



async function addIncentive2Subscriber(user_id,amount) {
  console.log("addIncentive2Subscriber");
  console.log(user_id);
  console.log(amount);

  try {

    const subscriberData = await Subscribers.findOne({ where: { subscriber_id: user_id } });
    var gross_amount = Number(subscriberData.gross_wallet) + Number(amount);
    var wallet_amount = Number(subscriberData.wallet_balance) + Number(amount);

    const subscriberUpdated=await Subscribers.update({
          wallet_balance: wallet_amount,
          gross_wallet: gross_amount,
        },
        {
          where: {
            subscriber_id: user_id
          }
        });
    return subscriberUpdated;

  } catch (error) {
    return false;
  }
}


async function updateMe(req, res) {
  console.log("profile");
  console.log(req.user);
  console.log(req.body);

  try {
    const subscriber = await Subscribers.update(
      req.body,
      // wallet_balance: total_amount,
      {
        where: {
          subscriber_id: req.user.userId,
        },
      }
    );

    return res.json({ status: "success" });
  } catch (error) {
    return res.json({ status: "false" });
  }
}

async function subscribersData(req, res) {
  console.log(req.session.session_id);
  const subscribers_data = await Subscribers.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(subscribers_data);
  res.send(subscribers_data);
}

async function subscribersHome(req, res) {
  console.log("inside sub home");
  console.log(req.user);
  // console.log(req.body.subscriber_id);
  // const subscribers_data = await Subscribers.findAll();
  // Getting user data for the person who send the registration link
  const user_data = await Users.findOne({ where: { id: req.user.userId } });
  console.log(user_data);
  user_data.password = null;
  const subscriber_data = await Subscribers.findOne({
    where: { subscriber_id: req.user.userId },
  });
  // console.log(subscriber_data);
  const subordinate_data = await Subscribers.findAll({
    where: { parent_id: subscriber_data.subscriber_id },
  });
  // console.log(subordinate_data);
  res.json({ subscriber_data, subordinate_data, user_data });
}

async function viewSubscribersHome(req, res) {
  console.log("inside viewSubscribersHome");
  console.log(req.user);
  console.log(req.url);
  const parsedUrl = url.parse(req.url, true);
  const subscriberId = parsedUrl.query.subscriber_id;

  console.log(subscriberId);
  // console.log(req.body.subscriber_id);

  // const subscribers_data = await Subscribers.findAll();
  // Getting user data for the person who send the registration link
  const user_data = await Users.findOne({ where: { id: req.user.userId } });
  user_data.password = null;
  console.log(user_data);

  const subscriber_user_data = await Users.findOne({ where: { id: subscriberId } });

  const subscriber_data = await Subscribers.findOne({
    where: { subscriber_id: subscriberId },
  });
  console.log("subscriberData");
  console.log(subscriber_data);
  const subordinate_data = await Subscribers.findAll({
    where: { parent_id: subscriber_data.subscriber_id },
  });
  // console.log(subordinate_data);
  res.json({ subscriber_data,subscriber_user_data , subordinate_data, user_data });
}

async function viewSubscriber(req, res) {
  console.log("inside view sub");
  console.log(req.user);
  console.log(req.body.subscriber_id);

  const my_data = await Subscribers.findOne({
    where: { subscriber_id: req.user.userId },
  });
  console.log(my_data.name);
  const child_data = await Subscribers.findAll({
    where: { parent_id: subscriber_data.subscriber_id },
  });

  // console.log(subordinate_data);
  res.json({ my_data, child_data });
}

async function myProfile(req, res) {
  console.log("profile");
  console.log(req.user);

  const my_data = await Subscribers.findOne({
    where: { subscriber_id: req.user.userId },
  });
  console.log(my_data.name);

  // console.log(subordinate_data);
  res.json({ my_data });
}

module.exports = {
  subscribersData,
  searchSubscriber,
  subscribersHome,
  viewSubscribersHome,
  viewSubscriber,
  myProfile,
  updateMe,
  addIncentive2Subscriber
};
