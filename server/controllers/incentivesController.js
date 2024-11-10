const Model = require('../models/incentive');


const walletHistoriesController = require("../controllers/walletHistoriesController");
const subscribersController = require("../controllers/subscribersController");



async function getAll(req, res) {

  const data = await Model.findAll();
  console.log(data);
  res.send(data)
}

async function getById(req, res) {

  const data = await Model.findOne({
    where: {
      id: req.body.id
    }
  });
  console.log(data);
  res.send(data)
}


async function searchByString(req, res) {

  const data = await Model.findOne({
    where: {
      name: req.body.name
    }
  });
  console.log(data);
  res.send(data)
}



async function searchByNumber(req, res) {

  const data = await Model.findOne({
    where: {
      id: req.body.id
    }
  });
  console.log(data);
  res.send(data)
}

async function add(req, res) {

  console.log(req.body);
  const data = await Model.create({
    name: req.body.name,
    description: req.body.description,
  });
  Model.sync();
  console.log("new auto-generated ID:", data.id);
  console.log(data);
  res.send(data)
}


async function update(req, res) {
  console.log(req.body);

  const data = await Model.update({
    name: req.body.name,
    description: req.body.description,
  },{
    where: {
      id: req.body.id
    }
  });
  Model.sync();
  console.log(data);
  res.send(data)
}


async function payIncentive(req, res) {
  console.log(req.body);
  try {
    const incentiveData = await Model.findOne({
      where: {
        id: req.body.incentiveType,
      }
    });
    console.log(incentiveData);
    const walletUpdate = await subscribersController.addIncentive2Subscriber(req.body.user_id, req.body.amount);

    if(walletUpdate){
      const historyUpdate = await walletHistoriesController.addIncentiveHistory(req.body,req.user.userId, incentiveData);
    }
    res.send({walletUpdate, "message":"Incentives paid successfully"});
  }catch (e) {
    console.log(e);
    return false;
  }

}





module.exports={getAll,getById,searchByString,searchByNumber,add,update,payIncentive};