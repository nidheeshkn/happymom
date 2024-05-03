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
const Subscribers = require('./models/subscriber')
const positionsController =require("./controllers/positionsController")
const feesController =require("./controllers/feesController")
const usersController =require("./controllers/usersController")
const subscribersController =require("./controllers/subscribersController");
const WalletHistories = require('./models/wallet');
const walletHistoriesController =require("./controllers/walletHistoriesController");
const coursesController =require("./controllers/coursesController");



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

  // if(req.url)
  console.log(req.url);
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token.split(' ')[1], 'c23642fe54246a5c97e512e531da30f2211725825e390e8dcb63637b7af8bf81', (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Invalid token' });
      }
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

      }else{

        return res.status(401).json({ status: "failed", message: "mobile-number or password is incorrect" });
      }

    });

  } else {
    return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });

  }
});



// app.use(auth)

app.get("/api/user/home", async function (req, res) {
  console.log(req.session.session_id)
  const SubscriberData = await Subscribers.findOne({ where: { subscriber_id: req.session.session_id } });
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(SubscriberData);
  res.send(SubscriberData)
});



//     Call to usersController      begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/users", usersController.usersData );

app.get("/api/users/reference", usersController.userRegister );

app.post("/api/users/registration", usersController.userRegistration );

app.post("/api/users/checkAvailability", usersController.userNameAvilability );

//     Call to usersController      ends here ....................++++++++++++++++++++++++++++++++++




//     Call to positionsController      begins here ....................++++++++++++++++++++++++++++++++++

app.get("/api/positions",authenticate,positionsController.positionsData );


app.post("/api/positions/addPosition",authenticate, positionsController.addPosition);

app.post("/api/positions/updatePosition",authenticate,positionsController.updatePosition );

app.get("/api/positions",authenticate,positionsController.positionsData );


//     Call to positionsController      ends here ....................++++++++++++++++++++++++++++++++++





app.get("/api/fees", feesController.feesData );



app.get("/api/subscriber/home", authenticate,subscribersController.subscribersHome );

app.get("/api/subscriber/view", authenticate,subscribersController.viewSubscriber );

app.get("/api/subscriber/profile", authenticate,subscribersController.myProfile );

app.post("/api/subscriber/update_me", authenticate,subscribersController.updateMe );



app.get("/api/walletDetails",authenticate, walletHistoriesController.myWallet );

app.get("/api/courses",authenticate, coursesController.courseList );



app.listen(5000);