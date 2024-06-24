
const moment = require('moment'); // require
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


const Users = require("../models/user")
const PwdReset = require('../models/resetRequest');
const { where } = require('sequelize');
require('dotenv').config();
const saltRounds = 10;


async function resetMyPassword(req, res) {

  // This function is to reset password of a user without sending email
  console.log("inside resetMyPassword");
  console.log(req.body);


  try {

    const user_data = await Users.findOne({ where: { id: req.user.userId } });


    console.log(user_data);
    if (user_data.dataValues) {
      bcrypt.compare(req.body.curr, user_data.dataValues.password, function (err, hashResult) {
        if (hashResult) {

          try {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(req.body.newpassword, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                  return res.status(500).json({ status: "failed", message: "Something went wrong... " })
                } else {
                  (async function () {
                    let new_user = await Users.update({

                      password: hash,

                    }

                      , {
                        where: {
                          id: user_data.id
                        }
                      }


                    );
                    return res.json({ status: "success", message: "password saved successfuly" })


                  })();
                }

              });
            });



          } catch (error) {
            return res.status(500).json({ status: "Internal server error" })
          }

        } else {

          return res.status(401).json({ status: "failed", message: "current password is incorrect" });
        }

      });

    } else {
      return res.status(401).json({ status: "failed", message: "Unauthorised password reset request" });

    }
  } catch (error) {

    console.log(error);
    return res.status(500).json({ status: "failed", message: "Unexpected Server error, couldn't reset password..." });
  }


}



async function requestData(req, res) {

  console.log(req.session.session_id)
  const request_data = await PwdReset.findAll();
  console.log(request_data);
  res.send(request_data)
}





async function getRequest(req, res) {

  console.log(req.body.resettoken)
  const request_data = await PwdReset.findOne({ where: { request_link: req.body.resettoken } });
  console.log(request_data);

  res.json({ request_data })
}

async function addRequest(req, res) {

  console.log(req.body.mobile_number);
  console.log(req.body.email);

  console.log(process.env.EMAIL_USER); 
  console.log(process.env.EMAIL_PASS); 
  

  if (req.body.mobile_number) {
    const users_data = await Users.findOne({ where: { mobile_number: req.body.mobile_number } });
    console.log(users_data);
    if (users_data.email === req.body.email) {

      const randomString = generateRandomString(45); // Generate a random string of length 10
      console.log(randomString);

      let requestedTime = moment().format()
      let expiry_date = moment().add(3, 'days');

      try {
        const reset_data = await PwdReset.create({

          subscriber_id: users_data.id,
          request_link: randomString,
          request_status: "open",
          request_date: requestedTime,
          expiry_date: expiry_date,

        })

      const resetURL=`https://192.168.78.251:3000/resetpassword/updatepassword?reset_link=${randomString}`

        // Create a transporter
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }
        });
        
        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: req.body.email,
          subject: 'Password Reset Request From Happymom.com.in',
          html: `
<html>          
Hi,

We received a request to reset the password for your happymom account. 
If this was you, please click the link below to choose a new password:

<a href=${resetURL}>reset my password</a>


This password reset link will expire in 24 hours for your security. 
If you did not request this password reset, you can safely ignore this email.

If you have any questions or need help, please contact our support team at happymompms@gmail.com or +91 9400056815.
Thanks,
Happymom
</html>

          `
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        

        console.log(users_data.mobile_number);
        return res.json({ status: "email_send" })

      } catch (error) {
        return res.status(500).json({ status: "Internal server error" })
      }



    } else {


      return res.json({ status: "mismatch" })
    }

  } else {
    return res.json({ status: "Invalid request" })
  }



}

async function doReset(req, res) {

  console.log("inside doreset");
  console.log(req.body.password);
  console.log(req.body.resettoken);


  if (req.body.resettoken) {


    const request_data = await PwdReset.findOne({ where: { request_link: req.body.resettoken } });
    console.log(request_data);
    if (request_data.request_status === "open") {



      // let requestedTime=moment().format()
      // let expiry_date =moment().add(3, 'days');

      try {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
              return res.status(500).json({ status: "failed", message: "Something went wrong... " })
            } else {
              (async function () {
                let new_user = await Users.update({

                  password: hash,

                }

                  , {
                    where: {
                      id: request_data.subscriber_id
                    }
                  }


                );
                return res.json({ status: "success", message: "password saved successfuly" })


              })();
            }

          });
        });



      } catch (error) {
        return res.status(500).json({ status: "Internal server error" })
      }



    } else {


      return res.json({ status: "request_expired" })
    }

  } else {
    return res.json({ status: "Invalid request" })
  }



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


module.exports = { requestData, addRequest, doReset, getRequest, resetMyPassword }