
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/user');
const Subscribers = require('../models/subscriber');
const FeePayments = require('../models/feePayment');
const walletHistories = require('../models/wallet');



async function userRegistration(req, res) {

  console.log(req.body);
  try {
    // Getting user data for the person who send the registration link
    const user_data = await Users.findOne({ where: { link: req.body.refference_id } });
    console.log(user_data);
    // Check if we hve got user data for refference id 
    if (typeof user_data.id != "undefined") {
      // Read respective subscriber data(This is the details of parent)
      const parent_subscriber = await Subscribers.findOne({ where: { subscriber_id: user_data.id } });
      console.log(parent_subscriber);
      // Creating parent_id and parent name this will be usefull while populating wallet histories
      const parent_id = user_data.id;
      const parent_name = parent_subscriber.name;
      console.log(parent_name);
      const randomString = generateRandomString(45); // Generate a random string of length 10
      console.log(randomString);

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err){
              return res.status(500).json({status:"failed",message:"Something went wrong... "})
            }else{
              (async function(){
                let new_user = await Users.create({
                mobile_number: req.body.mobile_number,
                password: hash,
                email: req.body.email,
                // link: req.body.refference_id,
                link: randomString,
        
              });

              console.log("New user's auto-generated ID:", new_user.id);

              let today = new Date().toLocaleDateString()
        
              console.log(today)
              let new_subscriber = await Subscribers.create({
                subscriber_id: new_user.id,
                parent_id: parent_id,
                doj: today,
                wallet_balance: 0,
                active: false,
        
              });
              const fee_data = await FeePayments.findOne({ where: { Mobile_Number: 91 + new_user.mobile_number } });
              console.log(fee_data);
              if (typeof fee_data.Razorpay_TransactionId != "undefined") {
        
                await Subscribers.update({
                  name: fee_data.Student_Name,
                  active: true,
                },
                  {
                    where: {
                      subscriber_id: new_user.id
                    }
                  });
        
                console.log(new_subscriber, "++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                const subscriber_new = await Subscribers.findOne({ where: { subscriber_id: new_user.id } });
                let my_boss = await Subscribers.findOne({ where: { subscriber_id: user_data.id } });
        
        
                console.log(subscriber_new, "------------------------------");
                console.log(my_boss, "------------------------------");
        
                // parent_subscriber.sync(); 
                let incentive_percentage = 15;
                let incentive = fee_data.Actual_Amount * incentive_percentage / 100;
                console.log(incentive);
                let description = parent_name + " added a new person " + subscriber_new.name;
                console.log(description);
                var total_amount = Number(my_boss.wallet_balance) + Number(incentive);
                console.log(total_amount);
                const parent_subscriber = await Subscribers.update({
                  wallet_balance: total_amount,
                },
                  {
                    where: {
                      subscriber_id: my_boss.subscriber_id
                    }
                  });
        
                let wallet_entry = await walletHistories.create({
                  subscriber_id: my_boss.subscriber_id,
                  new_subscriber_id: subscriber_new.subscriber_id,
                  added_by: parent_id,
                  credit: Number(incentive),
                  description: description,
                  fee_payment_id: fee_data.Razorpay_TransactionId,
        
                });
        
        
        
                incentive_percentage = 5;
                let i = 4;
                let j = 0;
        
                while (my_boss.subscriber_id != my_boss.parent_id) {
        
        
                  my_boss = await Subscribers.findOne({ where: { subscriber_id: my_boss.parent_id } });
        
                  if (i > 0) {
                    let incentive = fee_data.Actual_Amount * incentive_percentage / 100;
        
                    var total_amount = Number(my_boss.wallet_balance) + Number(incentive);
                    console.log(total_amount);
                    const parent_subscriber = await Subscribers.update({
                      wallet_balance: total_amount,
                    },
                      {
                        where: {
                          subscriber_id: my_boss.subscriber_id
                        }
                      });
        
                    let wallet_entry = await walletHistories.create({
                      subscriber_id: my_boss.subscriber_id,
                      new_subscriber_id: subscriber_new.subscriber_id,
                      added_by: parent_id,
                      credit: Number(incentive),
                      description: description,
                      fee_payment_id: fee_data.Razorpay_TransactionId,
        
                    });
        
                    last_paid_subscriber_id = my_boss.subscriber_id;
                    i--;
                  } else {
                    j++;
                  }
                  console.log("value of subscriber ID=", my_boss.subscriber_id);
                  console.log("value of parent ID=", my_boss.parent_id);
                }
        
                if (j > 0) {
        
                  let rest_of_money = fee_data.Actual_Amount * incentive_percentage / 100;
        
                  incentive = rest_of_money / j;
        
                  my_boss = await Subscribers.findOne({ where: { subscriber_id: last_paid_subscriber_id } });
        
                  while (my_boss.subscriber_id != my_boss.parent_id) {
        
        
                    my_boss = await Subscribers.findOne({ where: { subscriber_id: my_boss.parent_id } });
        
        
        
        
                    var total_amount = Number(my_boss.wallet_balance) + Number(incentive);
                    console.log(total_amount);
                    const parent_subscriber = await Subscribers.update({
                      wallet_balance: total_amount,
                    },
                      {
                        where: {
                          subscriber_id: my_boss.subscriber_id
                        }
                      });
        
                    let wallet_entry = await walletHistories.create({
                      subscriber_id: my_boss.subscriber_id,
                      new_subscriber_id: subscriber_new.subscriber_id,
                      added_by: parent_id,
                      credit: Number(incentive),
                      description: description,
                      fee_payment_id: fee_data.Razorpay_TransactionId,
        
                    });
        
        
                  }
        
                  console.log("value of subscriber ID=", my_boss.subscriber_id);
                  console.log("value of parent ID=", my_boss.parent_id);
                }
        
              }
        
        
        
        
              res.send(new_subscriber);
            })();
            }

        });
    });
      


    }

  }

  catch (e) {


    console.log(e); return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });

  }

}





async function usersData(req, res) {

  console.log(req.session.session_id)
  const users_data = await Users.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(users_data);
  res.send(users_data)
}


async function userRegister(req, res) {

  console.log(req.query);
  // const users_data = await Users.findAll();
  const user_data = await Users.findOne({ where: { link: req.query.referee } });
  console.log(user_data);
  const parent_subscriber = await Subscribers.findOne({ where: { subscriber_id: user_data.id } });
      console.log(parent_subscriber);
  res.json({user_data,parent_subscriber});
  // res.send("hai")

}





// Function to generate a random string of specified length
function generateRandomString(length) {
  // Calculate the number of bytes needed to represent the specified length
  const byteLength = Math.ceil(length / 2);

  // Generate random bytes
  const randomBytes = crypto.randomBytes(byteLength);

  // Convert the random bytes to a hexadecimal string
  const randomHexString = randomBytes.toString('hex');

  // Return the substring of the hexadecimal string to ensure the desired length
  return randomHexString.substring(0, length);
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

module.exports = { usersData, userRegister, userRegistration }