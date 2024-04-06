
const Role = require('../models/role')


async function getRoles(req, res) {

    console.log(req.session.session_id)
    const role_data = await Role.findAll();
    // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
    console.log(role_data);
    res.send(role_data)
  }

  async function addRole(req, res) {

    console.log(req.session.session_id)
    const role_data = await Role.create({
        role_name: req.body.role_name,
    });
    Role.sync();
    console.log("new roles auto-generated ID:", position_data.position_id);
    // const  position_data = await Position.findAll();
    // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
    console.log(role_data);
    res.send(role_data);
  
  }


  async function updateRole(req, res) {

    console.log(req.session.session_id)
    
    const role_data = await Position.update({
        role_name: req.body.role_name,
      where: {
        role_id: req.body.role_id
      }
    });
    Role.sync();
    console.log(role_data);
    res.send(role_data)
  
  }

  module.exports={getRoles,addRole,updateRole}