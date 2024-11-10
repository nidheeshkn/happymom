const Model = require('../models/withdrawalRequestStatuses');


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
      title: req.body.searchString,
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
    title: req.body.title,
    description: req.body.description,
    added_by: req.user.userId,
    active: true
  });
  Model.sync();
  console.log("new auto-generated ID:", data.id);
  console.log(data);
  res.send(data)
}


async function update(req, res) {
  const data = await Model.update({
    title: req.body.title,
    description: req.body.description,
    added_by: req.user.userId,
    active: req.body.active,
  },{
    where: {
      id: req.body.id
    }
  });
  Model.sync();
  console.log(data);
  res.send(data)
}








  module.exports={getAll,getById,searchByString,searchByNumber,add,update};