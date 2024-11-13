const crypto = require('crypto');
const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');

const cors = require("cors");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const xlsx = require('xlsx');

// Option 3: Passing parameters separately (other dialects)

const User = require("./models/user");
const Subscribers = require('./models/subscriber');
const positionsController = require("./controllers/positionsController");
const feesController = require("./controllers/feesController");
const usersController = require("./controllers/usersController");
const subscribersController = require("./controllers/subscribersController");
const walletHistoriesController = require("./controllers/walletHistoriesController");
const coursesController = require("./controllers/coursesController");
const passwordResetController= require("./controllers/passwordResetController");
const incentivesController= require("./controllers/incentivesController");
const withdrawalRequestTypesController= require("./controllers/withdrawalRequestTypesController");
const withdrawalRequestStatusesController= require("./controllers/withdrawalRequestStatusesController");


const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));


// Function to generate JWT token
function generateToken(id) {
  const token = jwt.sign({
    userId: id,
    exp: Math.floor(Date.now() / 1000) + (10 * 24 * 60 * 60) // 10 days expiry
  }, 'c23642fe54246a5c97e512e531da30f2211725825e390e8dcb63637b7af8bf81');
  return token;
}


// Middleware to authenticate requests
function authenticate(req, res, next) {
  console.log("inside Auth middle");

  // if(req.url)
  console.log(req.url);
  console.log(req.body);

  const token = req.headers.authorization;

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token.split(' ')[1], 'c23642fe54246a5c97e512e531da30f2211725825e390e8dcb63637b7af8bf81', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
}


app.get("/", function (req, res) {

  res.send('Hai');
});



//  Login function   
app.post("/api/user/login", async function (req, res) {
  console.log("inside login");
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  try {
    
    const result = await User.findOne({ where: { mobile_number: req.body.username } });
    console.log(result);
    if (result.dataValues) {
      bcrypt.compare(req.body.password, result.dataValues.password, function (err, hashResult) {
        if (hashResult) {
  
          // Generate JWT token
          const token = generateToken(result.dataValues.id);
  
          // Send token in response
          // res.json({ token });
          return res.json({ status: "success", token });
          // res.redirect('/subscribers/home');
  
        } else {
  
          return res.status(401).json({ status: "failed", message: "mobile-number or password is incorrect" });
        }
  
      });
  
    } else {
      return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });
  
    }
  } catch (error) {
    return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });
  }

});




app.get("/api/user/home", async function (req, res) {
  console.log(req.session.session_id)
  const SubscriberData = await Subscribers.findOne({ where: { subscriber_id: req.session.session_id } });
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(SubscriberData);
  res.send(SubscriberData)
});



//     Call to usersController  without Authentication begins here ....................++++++++++++++++++++++++++++++++++



app.get("/api/users/reference", usersController.userRegister);

app.post("/api/users/registration", usersController.userRegistration);

app.post("/api/users/checkAvailability", usersController.userNameAvailability);

app.post("/api/users/checkemailAvailability", usersController.emailAvailability);



//     Call to passwordResetController  without Authentication begins here ....................++++++++++++++++++++++++++++++++++


app.post("/api/users/passwordresetrequest", passwordResetController.addRequest);

app.post("/api/users/readrequest", passwordResetController.getRequest);

app.post("/api/users/passwordreset", passwordResetController.doReset);

// This is for resetting password after user login

app.post("/api/users/resetmypassword",authenticate, passwordResetController.resetMyPassword);

// This is for resetting password by administrator

app.post("/api/users/resetUserPassword",authenticate, passwordResetController.resetUserPassword);


// app.use(auth)

//     Call to usersController  without Authentication begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/user", authenticate, usersController.userData);

app.get("/api/users",authenticate,  usersController.usersData);

app.post("/api/user/updatemyemail",authenticate,  usersController.updateEmail);



//     Call to usersController      ends here ....................++++++++++++++++++++++++++++++++++



app.get("/api/fees", feesController.feesData);


// Call to subscribersController      begins here ....................++++++++++++++++++++++++++++++++++


app.get("/api/subscriber/home", authenticate, subscribersController.subscribersHome);

app.get("/api/subscriber/viewSubscriber", authenticate, subscribersController.viewSubscribersHome);


app.get("/api/subscriber/view", authenticate, subscribersController.viewSubscriber);

app.get("/api/subscriber/profile", authenticate, subscribersController.myProfile);

app.post("/api/subscriber/update_me", authenticate, subscribersController.updateMe);
app.post("/api/subscriber/searchSubscriber", subscribersController.searchSubscriber);



app.get("/api/myWallet", authenticate, walletHistoriesController.myWallet);

app.post("/api/walletDetails", authenticate, walletHistoriesController.userWallet);




// Call to incentivesController      begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/incentives/getAll", authenticate, incentivesController.getAll);


app.post("/api/incentives/add", authenticate, incentivesController.add);

app.post("/api/incentives/update", authenticate, incentivesController.update);


app.post("/api/incentives/pay", authenticate, incentivesController.payIncentive);



// Call to incentivesController      ends here ....................++++++++++++++++++++++++++++++++++


//
//     Call to positionsController      begins here ....................++++++++++++++++++++++++++++++++++
//
app.get("/api/positions/getAll", authenticate, positionsController.getAll);
//
app.post("/api/positions/add", authenticate, positionsController.add);
//
app.post("/api/positions/update", authenticate, positionsController.update);
//
// app.get("/api/positions", authenticate, positionsController.positionsData);
//
//
//     Call to positionsController      ends here ....................++++++++++++++++++++++++++++++++++


//     Call to withdrawalRequestStatusesController      begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/withdrawalRequestStatuses/getAll", authenticate, withdrawalRequestStatusesController.getAll);

app.post("/api/withdrawalRequestStatuses/add", authenticate, withdrawalRequestStatusesController.add);

app.post("/api/withdrawalRequestStatuses/update", authenticate, withdrawalRequestStatusesController.update);

//     Call to withdrawalRequestStatusesController      ends here ....................++++++++++++++++++++++++++++++++++



//     Call to withdrawalRequestTypesController      begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/withdrawalRequestTypes/getAll", authenticate, withdrawalRequestTypesController.getAll);

app.post("/api/withdrawalRequestTypes/add", authenticate, withdrawalRequestTypesController.add);

app.post("/api/withdrawalRequestTypes/update", authenticate, withdrawalRequestTypesController.update);


//     Call to withdrawalRequestTypesController      ends here ....................++++++++++++++++++++++++++++++++++





app.listen(5000);