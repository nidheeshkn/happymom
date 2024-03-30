const crypto = require('crypto');
const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');

const cors = require("cors");
// Option 3: Passing parameters separately (other dialects)
const User = require("./models/user");
const Subscribers = require('./models/subscribers')
// const auth = require("./auth/auth");
const positionController =require("./controllers/positionController")
const feesController =require("./controllers/feesController")
const usersController =require("./controllers/usersController")


const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));


app.get("/", function (req, res) {

  res.send('Hai');
});


app.post("/login", async function (req, res) {
  console.log("inside login");
  console.log(req.body);


  const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(result);
  if (result.dataValues) {
    bcrypt.compare(req.body.password, result.dataValues.password, function (err, hashResult) {
      if (hashResult) {
        req.session.isLoggedIn = true;
        req.session.session_id = result.dataValues.id

        // res.redirect('/dashboard');
        return res.json({ status: "success", user: req.session.username, message: "succesfuly loged in" });
      }

    });

  } else {
    return res.status(401).json({ status: "failed", message: "mobile number or password is incorrect" });

  }
});



// app.use(auth)
app.get("/user/home", async function (req, res) {
  console.log(req.session.session_id)
  const SubscriberData = await Subscribers.findOne({ where: { subscriber_id: req.session.session_id } });
  // const result = await User.findOne({ where: { mobile_number: req.body.mobile_number } });
  console.log(SubscriberData);
  res.send(SubscriberData)
});


app.get("/positions",positionController.positionsData );


app.post("/positions/addPosition", positionController.addPosition);

app.post("/positions/updatePosition",positionController.updatePosition );


app.get("/positions",positionController.positionsData );

app.get("/fees", feesController.feesData );

app.get("/users", usersController.usersData );

app.get("/users/register", usersController.userRegister );

app.post("/users/registration", usersController.userRegistration );

app.get("/subscribers/home", usersController.usersData );



app.listen(5000);