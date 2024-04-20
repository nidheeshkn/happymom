
const fs = require('node:fs');
const csvParser = require('csv-parser');
// const FeePayments = require('../models/feePayment');
const feesController =require("../controllers/feesController")



const express = require('express');
// const multer = require('multer');
const xlsx = require('xlsx');
// const mysql = require('mysql'); // Or your database driver

const workbook = xlsx.readFile("Transactions.xlsx");
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

for (const row of data) {
// console.log(row);


const result=feesController.addData(row);


}

// // Route for handling file upload and data import
// app.post('/upload', upload.single('excelFile'), async (req, res) => {
//   try {


//     // Connect to database pool
//     const connection = await pool.getConnection();

//     // Prepare SQL statement (modify based on your table structure)
//     const sql = 'INSERT INTO your_table (column1, column2, ...) VALUES ?';

//     // Execute insertion in a transaction for bulk inserts
//     await connection.beginTransaction();
//     for (const row of data) {
//       // Map Excel data to database columns (adjust as needed)
//       const mappedRow = {
//         column1: row['Column A Header'], // Replace with actual header names
//         column2: row['Column B Header'],
//         // ...
//       };
//       await connection.query(sql, [[mappedRow]]);
//     }
//     await connection.commit();

//     res.json({ message: 'Data imported successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error importing data' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));



// async function feesData(req, res) {

//   console.log(req.session.session_id)
//   const fees_data = await FeePayments.findAll();
//   console.log(fees_data);
//   res.send(fees_data)
// }


// async function updateFees(req, res) {



//   // try {
//   // const data = fs.readFileSync('Transactions.csv');
//   //   const data = fs.readFileSync('/home/nidheesh/Projects/happymom_server/controllers/Transactions.csv');
//   //   console.log(data);
//   // } catch (err) {
//   //   console.error(err);
//   // }

//   let data;
//   const csvFilePath = '/home/nidheesh/Projects/happymom_server/controllers/Transactions.csv';
//   fs.createReadStream(csvFilePath)
//     .pipe(csvParser())
//     .on('data', (row) => {
//       data = {
//         Razorpay_TransactionId: row.Razorpay_TransactionId,
//         Student_Name: row.Student_Name,
//         Mobile_Number: row.Mobile_Number,
//         Email_Id: row.Email_Id,
//         State: row.State,
//         Date_of_Purchase: row.Date_of_Purchase,
//         CourseId: row.CourseId,
//         Course_Name: row.Course_Name,
//         Course_expiry_date: row.Course_expiry_date,
//         Payment_Type: row.Payment_Type,
//         Quantity: row.Quantity,
//         Internet_Charges_Handler: row.Internet_Charges_Handler,
//         Coupon_Code: row.Coupon_Code,
//         Coupon_Value: row.Coupon_Value,
//         Amount_Paid: row.Amount_Paid,
//         Internet_Handling_Charges: row.Internet_Handling_Charges,
//         Actual_Amount: row.Actual_Amount,
//         Classplus_Share: row.Classplus_Share,
//         Amount_Transferred: row.Amount_Transferred,
//         Razorpay_TransferId: row.Razorpay_TransferId,
//         Purchase_Invoice: row.Purchase_Invoice,
//         Payment_Detail: row.Payment_Detail,
//         Settlement_UTR: row.Settlement_UTR,
//         used_fee: row.used_fee,

//       }
//       console.log(data);
//     }

//     );


//   // const fees_data = await FeePayments.findAll();
//   console.log(data);
//   res.send(data);

// }

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

// module.exports = { feesData, updateFees }