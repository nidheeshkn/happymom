const User=require("./user");
const Subscribers = require('./subscribers')
const FeePayments = require('./feePayments')
const Position = require('./position')
const UserRoles = require("./userroles")
const WalletHistories = require("./wallet")
// User.sync();
User.sync({alter:true});
// Subscribers.sync({alter:true});
Subscribers.sync({});

FeePayments.sync();
Position.sync();
UserRoles.sync();
WalletHistories.sync();
// WalletHistories.sync({alter:true});
