const bcrypt = require('bcrypt');

// Hashing function
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

// Verification function
async function verifyPassword(password, hashedPassword) {
    try { 
        const match = await bcrypt.compare(password, hashedPassword);
        
        console.log("Password Verification Result:", match);
        
        return match;
    } catch (error) {
        console.error("Password Verification Error:", error);
        throw error;
    }
}

module.exports={
    verifyPassword,
    hashPassword
}