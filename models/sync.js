const User=require("./user");
const Subscribers = require('./subscriber')
const FeePayments = require('./feePayment')
const Position = require('./position')
const Roles = require("./role")
const UserRoles = require("./userrole")
const WalletHistories = require("./wallet")
User.sync();
// User.sync({alter:true});
Subscribers.sync({alter:true});
// Subscribers.sync({});

FeePayments.sync();
// Position.sync();
Position.sync({alter:true});

Roles.sync();
UserRoles.sync();
WalletHistories.sync();
// WalletHistories.sync({alter:true});
