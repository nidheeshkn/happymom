
const moment = require('moment'); // require
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


const Users = require("../models/user")
const PwdReset = require('../models/resetRequest');
const { where } = require('sequelize');

const saltRounds = 10;


async function requestData(req, res) {

  console.log(req.session.session_id)
  const request_data = await PwdReset.findAll();
  console.log(request_data);
  res.send(request_data)
}


async function getRequest(req, res) {

  console.log(req.body.resettoken )
  const request_data = await PwdReset.findOne({ where: { request_link: req.body.resettoken } });
  console.log(request_data);

  res.json({request_data})
}

async function addRequest(req, res) {

  console.log(req.mobile_number);
  console.log(req.email);

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


        // Create a transporter object
        // let transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: 'your-email@gmail.com',
        //     pass: 'your-email-password'
        //   }
        // });

        // Define the email details
        // let mailOptions = {
        //   from: 'your-email@gmail.com',
        //   to: 'recipient-email@gmail.com',
        //   subject: 'Test Email',
        //   text: 'This is a test email sent from Nodemailer in Node.js'
        // };

        // Send the email
        // transporter.sendMail(mailOptions, function(err, data) {
        //   if (err) {
        //     console.log('Error occurred:', err);
        //   } else {
        //     console.log('Email sent successfully');
        //   }
        // });
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


module.exports = { requestData, addRequest, doReset,getRequest }