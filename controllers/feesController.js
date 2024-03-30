
const FeePayments = require('../models/feePayments');



async function feesData(req, res) {

    console.log(req.session.session_id)
    const fees_data = await FeePayments.findAll();
    console.log(fees_data);
    res.send(fees_data)
  }

  // async function addPosition(req, res) {

  //   console.log(req.session.session_id)
  //   const position_data = await Position.create({
  //     position_name: req.body.position_name,
  //     position_rank: req.body.position_rank,
  //     total_subscribers: req.body.total_subscribers
  //   });
  //   Position.sync();
  //   console.log("new positions auto-generated ID:", position_data.position_id);
  //   // const  position_data = await Position.findAll();
  //   // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  //   console.log(position_data);
  //   res.send(position_data)
  
  // }


  // async function updatePosition(req, res) {

  //   console.log(req.session.session_id)
    
  //   const position_data = await Position.update({
  //     position_name: req.body.position_name,
  //     position_rank: req.body.position_rank,
  //     total_subscribers: req.body.total_subscribers,
  //     where: {
  //       position_name: req.body.position_id
  //     }
  //   });
  //   Position.sync();
  //   console.log(position_data);
  //   res.send(position_data)
  
  // }

  module.exports={feesData}