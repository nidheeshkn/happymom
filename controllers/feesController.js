const fs = require('node:fs');
const csvParser = require('csv-parser');
const FeePayments = require('../models/feePayment');
const Subscribers = require('../models/subscriber');
const walletHistories = require('../models/wallet');




function calculateIncreasingPercentages(numLevels) {
  if (numLevels <= 0) {
    throw new Error("Number of levels must be positive.");
  }

  // Calculate total weight for normalization
  const totalWeight = (numLevels * (numLevels + 1)) / 2;
  console.log(totalWeight);

  // Function to calculate weight for each level (lower level, higher weight)
  const weight = level => numLevels - level + 1;
  console.log(weight);

  // Calculate percentages for each level
  const percentages = [];
  for (let level = 0; level < numLevels; level++) {
    percentages.push(weight(level) / totalWeight);
  }

  return percentages;
}



async function distributeBonus(new_subscriber, fee_data) {


  console.log("inside distributeBonus");
  console.log(new_subscriber);
  console.log(fee_data, fee_data.Actual_Amount, fee_data.Course_Name);

  const subscriber_new = await Subscribers.findOne({ where: { subscriber_id: new_subscriber.subscriber_id } });

  console.log(new_subscriber, "++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  let parent = await Subscribers.findOne({ where: { subscriber_id: new_subscriber.parent_id } });
  const parent_name = parent.name;
  const parent_id = parent.subscriber_id;




  let description = subscriber_new.name + " joined " + fee_data.Course_Name;
  console.log(description);

  let my_boss = await Subscribers.findOne({ where: { subscriber_id: new_subscriber.subscriber_id } });
  console.log(my_boss, "------------------------------");
  const total_incentive_percentage = 40;
  let incentive_allotted = 0;
  let incentive_percentage = 15;
  let last_paid_incentive_percentage = 0;
  let i = 3;
  let j = 0;

  while (my_boss.subscriber_id != my_boss.parent_id) {


    my_boss = await Subscribers.findOne({ where: { subscriber_id: my_boss.parent_id } });

    if (i > 0) {
      let incentive = fee_data.Actual_Amount * incentive_percentage / 100;
      var gross_amount = Number(my_boss.gross_wallet) + Number(incentive);

      var total_amount = Number(my_boss.wallet_balance) + Number(incentive);
      console.log(total_amount);
      const parent_subscriber = await Subscribers.update({
        wallet_balance: total_amount,
        gross_wallet: gross_amount,

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
      incentive_allotted = incentive_allotted + incentive_percentage;

      incentive_percentage = incentive_percentage - 5;
      last_paid_incentive = incentive;
      last_paid_subscriber_id = my_boss.subscriber_id;
      i--;
    } else {
      j++;
    }
    console.log("value of subscriber ID=", my_boss.subscriber_id);
    console.log("value of parent ID=", my_boss.parent_id);
  }

  incentive_percentage = total_incentive_percentage - incentive_allotted;

  let rest_of_money = fee_data.Actual_Amount * incentive_percentage / 100;



  if (j > 0) {
    percentages = calculateIncreasingPercentages(j + 1);

    console.log(percentages);

    const amounts = [];
    percentages.forEach((i, ind) => {
      if (ind > 0)
        // console.log(i);

        amounts.push(rest_of_money * i);

    });

    console.log(amounts);

    i = 0;
    my_boss = await Subscribers.findOne({ where: { subscriber_id: last_paid_subscriber_id } });

    while (my_boss.subscriber_id != my_boss.parent_id) {

      my_boss = await Subscribers.findOne({ where: { subscriber_id: my_boss.parent_id } });

      var incentive = amounts[i];
      console.log(incentive);
      if (incentive > last_paid_incentive) {
        incentive = last_paid_incentive;
      }
      var gross_amount = Number(my_boss.gross_wallet) + Number(incentive);
      var total_amount = Number(my_boss.wallet_balance) + Number(incentive);
      const parent_subscriber = await Subscribers.update({
        wallet_balance: total_amount,
        gross_wallet: gross_amount,
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
      i = i + 1;

    }

    console.log("value of subscriber ID=", my_boss.subscriber_id);
    console.log("value of parent ID=", my_boss.parent_id);
  }




}

async function feesData(req, res) {

  console.log(req.session.session_id)
  const fees_data = await FeePayments.findAll();
  console.log(fees_data);
  res.send(fees_data)
}

async function addData(row) {



  // console.log(row);
  const fixedData = {};
  for (const key in row) {
    const newKey = key.replace(/\s+/g, '_');
    fixedData[newKey] = row[key];
  }

  // console.log(fixedData);

  const avilable_fee_data = await FeePayments.findOne({ where: { Razorpay_TransactionId: fixedData.Razorpay_TransactionId } });
  // console.log(avilable_fee_data);

  if (avilable_fee_data === null) {
    const fee_data = await FeePayments.create({
      Student_Name: fixedData.Student_Name,
      Razorpay_TransactionId: fixedData.Razorpay_TransactionId,
      Mobile_Number: fixedData.Mobile_Number,
      Email_Id: fixedData.Email_Id,
      State: fixedData.State,
      Date_of_Purchase: fixedData.Date_of_Purchase,
      CourseId: fixedData.CourseId,
      Course_Name: fixedData.Course_Name,
      Course_expiry_date: fixedData.Course_expiry_date,
      Payment_Type: fixedData.Payment_Type,
      Quantity: fixedData.Quantity,
      Internet_Charges_Handler: fixedData.Internet_Charges_Handler,
      Coupon_Code: fixedData.Coupon_Code,
      Coupon_Value: fixedData.Coupon_Value,
      Amount_Paid: fixedData.Amount_Paid,
      Internet_Handling_Charges: fixedData.Internet_Handling_Charges,
      Actual_Amount: fixedData.Actual_Amount,
      Classplus_Share: fixedData.Classplus_Share,
      Amount_Transferred: fixedData.Amount_Transferred,
      Razorpay_TransferId: fixedData.Razorpay_TransferId,
      Purchase_Invoice: fixedData.Purchase_Invoice,
      Payment_Detail: fixedData.Payment_Detail,
      Settlement_UTR: fixedData.Settlement_UTR,

    });
    FeePayments.sync();
    console.log("new fees auto-generated ID:", fee_data.Razorpay_TransactionId);
    // Getting user data for the person who send the registration link
    const user_data = await Users.findOne({ where: { mobile_number: fee_data.Mobile_Number } });
    console.log(user_data);
    // Read respective subscriber data(This is the details of parent)
    const new_subscriber = await Subscribers.findOne({ where: { subscriber_id: user_data.id } });
    console.log(new_subscriber);

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


  } else {
    console.log("record Avilable");
  }
}


async function updateFees(req, res) {



  // try {
  // const data = fs.readFileSync('Transactions.csv');
  //   const data = fs.readFileSync('/home/nidheesh/Projects/happymom_server/controllers/Transactions.csv');
  //   console.log(data);
  // } catch (err) {
  //   console.error(err);
  // }

  let data;
  const csvFilePath = '/home/nidheesh/Projects/happymom_server/controllers/Transactions.csv';
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      data = {
        Razorpay_TransactionId: row.Razorpay_TransactionId,
        Student_Name: row.Student_Name,
        Mobile_Number: row.Mobile_Number,
        Email_Id: row.Email_Id,
        State: row.State,
        Date_of_Purchase: row.Date_of_Purchase,
        CourseId: row.CourseId,
        Course_Name: row.Course_Name,
        Course_expiry_date: row.Course_expiry_date,
        Payment_Type: row.Payment_Type,
        Quantity: row.Quantity,
        Internet_Charges_Handler: row.Internet_Charges_Handler,
        Coupon_Code: row.Coupon_Code,
        Coupon_Value: row.Coupon_Value,
        Amount_Paid: row.Amount_Paid,
        Internet_Handling_Charges: row.Internet_Handling_Charges,
        Actual_Amount: row.Actual_Amount,
        Classplus_Share: row.Classplus_Share,
        Amount_Transferred: row.Amount_Transferred,
        Razorpay_TransferId: row.Razorpay_TransferId,
        Purchase_Invoice: row.Purchase_Invoice,
        Payment_Detail: row.Payment_Detail,
        Settlement_UTR: row.Settlement_UTR,
        used_fee: row.used_fee,

      }
      console.log(data);
    }

    );


  // const fees_data = await FeePayments.findAll();
  console.log(data);
  res.send(data);

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

module.exports = { feesData, updateFees, addData, distributeBonus }