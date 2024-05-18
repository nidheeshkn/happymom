const User=require("./user");
const Subscribers = require('./subscriber')
const FeePayments = require('./feePayment')
const Position = require('./position')
const Roles = require("./role")
const UserRoles = require("./userrole")
const WalletHistories = require("./wallet")
const passwordRequests = require('./resetRequest')




User.sync();
// User.sync({alter:true});

Subscribers.sync({});
// Subscribers.sync({alter:true});

FeePayments.sync();
// FeePayments.sync({alter:true});


Position.sync();
// Position.sync({alter:true});

Roles.sync();
// Roles.sync({alter:true});

UserRoles.sync();
// UserRoles.sync({alter:true});


WalletHistories.sync();
// WalletHistories.sync({alter:true});

// passwordRequests.sync();
passwordRequests.sync({alter:true});
