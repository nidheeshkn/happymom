
const wallet = require('../models/wallet');
const Subscribers = require('../models/subscriber');
const Users = require('../models/user');




async function getAll(req, res) {

  const data = await wallet.findAll();
  console.log(data);
  res.send(data)
}


async function addIncentiveHistory(incentive,userId, incentiveData) {
  console.log("inside addIncentiveHistory");

  // console.log(incentiveData);
  // console.log(incentiveData.id);
  try {
    let new_entry = await wallet.create({
      incentive_id:incentiveData.id,
      subscriber_id:incentive.user_id,
      credit:incentive.amount,
      added_by:userId,
      description:incentiveData.name,
    });
    console.log(new_entry);
    return new_entry;
  }catch (e) {
    console.log(e);
    return false;
  }


}


async function walletData(req, res) {

  console.log(req.session.session_id)
  if (req.session.session_id === 10001) {
    const all_wallet_data = await wallet.findAll();
    // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
    console.log(all_wallet_data);
    res.send(all_wallet_data)
  }

}

async function myWallet(req, res) {

  console.log(req.user);

  // req.user.userId=req.body.subscriber_id;
  if (req.user.userId) {
    const user_data = await Users.findOne({ where: { id: req.user.userId } });
    console.log(user_data);
    user_data.password=null;
    const my_wallet_data = await wallet.findAll({ where: { subscriber_id: req.user.userId }, order: [
        ['createdAt', 'DESC'] // Sort by createdAt column in descending order
      ] });
    console.log(my_wallet_data);
    const subscriber_data = await Subscribers.findOne({ where: { subscriber_id: req.user.userId } });
    // my_wallet_data.date=
    res.json({subscriber_data,my_wallet_data,user_data});
  } else {

    res.json({ message: "invalid User" });


  }
}


async function userWallet(req, res) {

  console.log("inside userWallwt fn...");
  console.log(req.user);
  console.log(req.body);

  // req.user.userId=req.body.subscriber_id;
  if (req.body.user_id) {
    const userId=req.body.user_id;
    const user_data = await Users.findOne({ where: { id: userId } });
    console.log(user_data);
    user_data.password=null;
    const my_wallet_data = await wallet.findAll({ where: { subscriber_id: userId }, order: [
        ['createdAt', 'DESC'] // Sort by createdAt column in descending order
      ] });
    console.log(my_wallet_data);
    const subscriber_data = await Subscribers.findOne({ where: { subscriber_id: userId } });
    // my_wallet_data.date=
    res.json({subscriber_data,my_wallet_data,user_data});
  } else {

    res.json({ message: "invalid User" });


  }
}





  module.exports = { walletData, myWallet,userWallet,getAll,addIncentiveHistory };