const fs = require('fs');
const csvParser = require('csv-parser');
const axios = require('axios');
const FeePayments = require('./FeePayments');

const csvFilePath = 'transactions.csv';

const postData = (data) => {
  axios.post('https://your-remote-server.com/api/fee-payments', data)
    .then((response) => {
      console.log('Data inserted successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error inserting data:', error.response.data);
    });
};

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const data = {
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
    };

    postData(data);
  })
  .on('end', () => {
    console.log('CSV file processed successfully');
  });