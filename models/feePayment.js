const {  DataTypes } = require('sequelize');
const db=require("./db");

const FeePayments = db.define('fee_payments', {
    Razorpay_TransactionId:{
        type:DataTypes.STRING,
        primaryKey:true,

    },
    Student_Name:{
        type:DataTypes.STRING,
       
    },
    Mobile_Number:{
        type:DataTypes.STRING,
       
    },
    Email_Id:{
        type:DataTypes.STRING,
       
    },
    State:{
        type:DataTypes.STRING,
       
    },
    Date_of_Purchase:{
        type:DataTypes.STRING,
       
    },
    CourseId:{
        type:DataTypes.INTEGER,
       
    },
    Course_Name:{
        type:DataTypes.STRING,
       
    },
    


    Course_expiry_date:{
        type:DataTypes.STRING,
       
    },
    Payment_Type:{
        type:DataTypes.STRING,
       
    },
    Quantity:{
        type:DataTypes.INTEGER,
       
    },
    Internet_Charges_Handler:{
        type:DataTypes.STRING,
       
    },
    Coupon_Code:{
        type:DataTypes.STRING,
       
    },
    Coupon_Value:{
        type:DataTypes.INTEGER,
       
    },
    Amount_Paid:{
        type:DataTypes.DOUBLE,
       
    },
    Internet_Handling_Charges:{
        type:DataTypes.STRING,
       
    },  
    Actual_Amount:{
        type:DataTypes.INTEGER,
       
    },  
    Classplus_Share:{
        type:DataTypes.DOUBLE,
       
    },  
    Amount_Transferred:{
        type:DataTypes.DOUBLE,
       
    },  
    Razorpay_TransferId:{
        type:DataTypes.STRING,
       
    }, 
    Purchase_Invoice:{
        type:DataTypes.STRING,
       
    }, 
    Payment_Detail:{
        type:DataTypes.STRING,
       
    }, 
    Settlement_UTR:{
        type:DataTypes.STRING,
       
    },
    used_fee:{
        type:DataTypes.BOOLEAN,
       defaultValue: false
    }
})

module.exports=FeePayments;