const bcrypt = require('bcrypt');

function encryptPassword(plaintext, salt = 10) {
    return bcrypt.hash(plaintext, salt);
}

function verifyPassowrd(loginPassword,hashedPasswordFromDatabase){
return bcrypt.compare(loginPassword, hashedPasswordFromDatabase, function(err, result) {
    if (err) {
        console.log(err)
    } else if (result) {
        // Passwords match, login successful
        return true
    } else {
        // Passwords don't match, login failed
        return false
    }
});
}


module.exports = {
    encryptPassword,
    verifyPassowrd
};
