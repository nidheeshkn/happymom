
const Users = require('../models/user');


async function usersData(req, res) {

  console.log(req.session.session_id)
  const users_data = await Users.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(users_data);
  res.send(users_data)
}


async function userRegister(req, res) {

  console.log(req.session.session_id)
  // const users_data = await Users.findAll();
  const user_data = await Users.findOne({ where: { link: req.body.refference_id } });
  console.log(user_data);
  res.send(user_data)
}



async function userRegistration(req, res) {

  
  // const users_data = await Users.findAll();
  const user_data = await Users.findOne({ where: { link: req.body.refference_id } });
  console.log(user_data);
  res.send(user_data)
}


//   async function addPosition(req, res) {

//     console.log(req.session.session_id)
//     const position_data = await Position.create({
//       position_name: req.body.position_name,
//       position_rank: req.body.position_rank,
//       total_subscribers: req.body.total_subscribers
//     });
//     Position.sync();
//     console.log("new positions auto-generated ID:", position_data.position_id);
//     // const  position_data = await Position.findAll();
//     // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
//     console.log(position_data);
//     res.send(position_data)
  
//   }


//   async function updatePosition(req, res) {

//     console.log(req.session.session_id)
    
//     const position_data = await Position.update({
//       position_name: req.body.position_name,
//       position_rank: req.body.position_rank,
//       total_subscribers: req.body.total_subscribers,
//       where: {
//         position_name: req.body.position_id
//       }
//     });
//     Position.sync();
//     console.log(position_data);
//     res.send(position_data)
  
//   }

  module.exports={usersData,userRegister,userRegistration}