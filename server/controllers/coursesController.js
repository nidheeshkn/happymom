const Model = require('../models/course');


async function getAll(req, res) {

  const data = await Model.findAll();
  console.log(data);
  res.send(data)
}

async function getById(req, res) {

  const data = await Model.findOne({
    where: {
      position_id: req.body.position_id
    }
  });
  console.log(data);
  res.send(data)
}


async function searchByString(req, res) {

  const data = await Model.findOne({
    where: {
      position_name: req.body.position_id
    }
  });
  console.log(data);
  res.send(data)
}



async function searchByNumber(req, res) {

  const data = await Model.findOne({
    where: {
      position_name: req.body.position_id
    }
  });
  console.log(data);
  res.send(data)
}

async function add(req, res) {

  console.log(req.body);
  const data = await Model.create({
    position_name: req.body.position_name,
    position_rank: req.body.position_rank,
    gross_wallet: req.body.gross_wallet,
    total_subscribers: req.body.total_subscribers
  });
  Model.sync();
  console.log("new auto-generated ID:", data.position_id);
  console.log(data);
  res.send(data)
}


async function update(req, res) {
  const data = await Model.update({
    position_name: req.body.position_name,
    position_rank: req.body.position_rank,
    gross_wallet: req.body.gross_wallet,
    total_subscribers: req.body.total_subscribers
  },{
    where: {
      position_id: req.body.position_id
    }
  });
  Model.sync();
  console.log(data);
  res.send(data)
}








  module.exports={getAll,getById,searchByString,searchByNumber,add,update};