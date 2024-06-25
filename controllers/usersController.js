
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../models/user');
const Subscribers = require('../models/subscriber');
const FeePayments = require('../models/feePayment');
const walletHistories = require('../models/wallet');

const feesController = require("../controllers/feesController");
const { Op } = require('sequelize');





async function initialUser(first_user) {

  console.log(first_user);
  try {
    const randomString = generateRandomString(45); // Generate a random string of length 10
    console.log(randomString);


    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(first_user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log("Something went wrong... ");
        } else {
          (async function () {
            let new_user = await Users.create({
              id: 10001,

              mobile_number: first_user.mobile_number,
              password: hash,
              email: first_user.email,
              // link: req.body.refference_id,
              link: randomString,

            });

            console.log("New user's auto-generated ID:", new_user.id);
            console.log(new_user);

            let today = new Date().toLocaleDateString()

            console.log(today)
            let new_subscriber = await Subscribers.create({
              subscriber_id: new_user.id,
              parent_id: new_user.id,
              name: "P M Shaji",
              doj: today,
              gross_wallet: 0,
              wallet_balance: 0,
              active: true,

            });
            console.log(new_subscriber);
          })();
        }

      });
    }
    );





  }

  catch (e) {


    console.log(e); return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });

  }

}

async function userNameAvailability(req, res) {

  console.log(req.body.mobile_number)
  if (req.body.mobile_number) {
    const users_data = await Users.findOne({ where: { mobile_number: req.body.mobile_number } });
    console.log(users_data);
    if (users_data) {
      res.send({ availability: "false", message: "This mobile number already exist" });
    } else {
      res.send({ availability: "true" })

    }

  }
}

async function emailAvailability(req, res) {
  if (req.body.email) {
    const users_data = await Users.findOne({ where: { email: req.body.email } });
    console.log(users_data);
    if (users_data) {
      res.send({ availability: "false", message: "This email already exist" });
    } else {
      res.send({ availability: "true" })

    }
  }
  // const users_data = await Users.findAll();

}

async function userRegistration(req, res) {

  console.log(req.body);

  try {
    console.log(req.body.mobile_number,req.body.email);
    console.log(req.body.email);
    if (req.body.mobile_number) {
      const user_data = await Users.findOne({ where: { 
        
        [Op.or]: [{  mobile_number: req.body.mobile_number }, {  email: req.body.email }],
      } });
      console.log(user_data);
      if (user_data) {
        res.send({ status: "failed", message: "This mobile number already exist" });
      } else {
        try {
          // Getting user data for the person who send the registration link
          const parent_user = await Users.findOne({ where: { link: req.body.refference_id } });
          console.log(parent_user);
          // Check if we hve got user data for refference id 
          if (typeof parent_user.id != "undefined") {
            // Read respective subscriber data(This is the details of parent)
            const parent_subscriber = await Subscribers.findOne({ where: { subscriber_id: parent_user.id } });
            console.log(parent_subscriber);
            // Creating parent_id and parent name this will be usefull while populating wallet histories
            const parent_id = parent_user.id;
            const parent_name = parent_subscriber.name;
            console.log(parent_name);
            const randomString = generateRandomString(45); // Generate a random string of length 10
            console.log(randomString);
      
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                  return res.status(500).json({ status: "failed", message: "Something went wrong... " })
                } else {
                  (async function () {
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
                      gross_wallet: 0,
                      wallet_balance: 0,
                      active: false,
      
                    });
                    const fee_data = await FeePayments.findOne({
                      where: {
                        //  Mobile_Number: 91 + new_user.mobile_number, used_fee:false 
                        [Op.and]: [{ Mobile_Number: 91 + new_user.mobile_number }, { used_fee: false }],
                      }
                    });
                    console.log(fee_data);
      
      
      
      
                    if (fee_data) {
                      if (typeof fee_data.Razorpay_TransactionId != "undefined") {
      
      
                        await Subscribers.update({
                          name: fee_data.Student_Name,
                          active: true,
                        },
                          {
                            where: {
                              subscriber_id: new_subscriber.subscriber_id
                            }
                          });
      
                        console.log("just b4 function call");
                        console.log(new_subscriber);
                        console.log(fee_data);
                        feesController.distributeBonus(new_subscriber, fee_data);
      
                      }
                    }
      
      
      
      
                    return res.json({ data: new_subscriber });
      
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
  
    }else{

     
      console.log(e); return res.status(401).json({ status: "failed", message: "mobile number is incorrect" });

    }

  } catch (error) {

    console.log(error); return res.status(401).json({ status: "failed", message: "Internal server error" });

  }


}





async function usersData(req, res) {

  console.log(req.session.session_id)
  const users_data = await Users.findAll();
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(users_data);
  res.send(users_data)
}


async function userData(req, res) {

  // console.log(req.session.session_id)
  console.log(req.user)
  // const users_data = await Users.findAll();
  const user_data = await Users.findOne({ where: { id: req.user.userId } });
  console.log(user_data, "user data new api");
  res.send(user_data)
}

async function userRegister(req, res) {

  console.log(req.query);
  // const users_data = await Users.findAll();
  const user_data = await Users.findOne({ where: { link: req.query.referee } });
  console.log(user_data);
  if (user_data) {
    const parent_subscriber = await Subscribers.findOne({ where: { subscriber_id: user_data.id } });
    console.log(parent_subscriber);
    res.json({ user_data, parent_subscriber });
  }

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



module.exports = { usersData, userData, userRegister, userRegistration, userNameAvailability,emailAvailability, initialUser }