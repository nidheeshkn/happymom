const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
const myPlaintextPassword = '1234';

// Function to generate a random string of specified length
function generateRandomString(length) {
    // Calculate the number of bytes needed to represent the specified length
    const byteLength = Math.ceil(length / 2);
  
    // Generate random bytes
    const randomBytes = crypto.randomBytes(byteLength);
  
    // Convert the random bytes to a hexadecimal string
    const randomHexString = randomBytes.toString('hex');
  
    // Return the substring of the hexadecimal string to ensure the desired length
    return randomHexString.substring(0, length);
  }


bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.

        console.log(hash);

        



// Usage example
const randomString = generateRandomString(45); // Generate a random string of length 10
console.log(randomString);
    });
});
