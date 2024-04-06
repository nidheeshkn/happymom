
const wallet = require('../models/wallet')


async function walletData(req, res) {

    console.log(req.session.session_id)
    if(req.session.session_id===10001){
        const all_wallet_data = await wallet.findAll();
        // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
        console.log(all_wallet_data);
        res.send(all_wallet_data)
    }
    
  }

  async function myWallet(req, res) {

    console.log(req.session.session_id);
    const my_wallet_data = await wallet.findAll({ where: { subscriber_id: req.body.session_id } });
    console.log(my_wallet_data);
    res.send(my_wallet_data);

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

  module.exports={walletData,myWallet}