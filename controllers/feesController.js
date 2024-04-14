const fs = require('node:fs');
const csvParser = require('csv-parser');
const FeePayments = require('../models/feePayment');



async function feesData(req, res) {

    console.log(req.session.session_id)
    const fees_data = await FeePayments.findAll();
    console.log(fees_data);
    res.send(fees_data)
  }


  async function updateFees(req, res) {

    

try {
  const data = fs.readFileSync('Transactions.csv');
  console.log(data);
} catch (err) {
  console.error(err);
}


//     const csvFilePath = 'Transactions.csv';
//     fs.createReadStream(csvFilePath)
//   .pipe(csvParser())
//   .on('data', (row) => {
//     const data = {
//       Razorpay_TransactionId: row.Razorpay_TransactionId,
//       Student_Name: row.Student_Name,
//       Mobile_Number: row.Mobile_Number,
//       Email_Id: row.Email_Id,
//       State: row.State,
//       Date_of_Purchase: row.Date_of_Purchase,
//       CourseId: row.CourseId,
//       Course_Name: row.Course_Name,
//       Course_expiry_date: row.Course_expiry_date,
//       Payment_Type: row.Payment_Type,
//       Quantity: row.Quantity,
//       Internet_Charges_Handler: row.Internet_Charges_Handler,
//       Coupon_Code: row.Coupon_Code,
//       Coupon_Value: row.Coupon_Value,
//       Amount_Paid: row.Amount_Paid,
//       Internet_Handling_Charges: row.Internet_Handling_Charges,
//       Actual_Amount: row.Actual_Amount,
//       Classplus_Share: row.Classplus_Share,
//       Amount_Transferred: row.Amount_Transferred,
//       Razorpay_TransferId: row.Razorpay_TransferId,
//       Purchase_Invoice: row.Purchase_Invoice,
//       Payment_Detail: row.Payment_Detail,
//       Settlement_UTR: row.Settlement_UTR,
//       used_fee: row.used_fee,

//   }
// });
    
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

  module.exports={feesData,updateFees}