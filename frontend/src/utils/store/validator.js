export const validatePassword = (pwd) => {
    const minLength = 6;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    const alphaNumericPattern = /[a-zA-Z0-9]/g;
    
    if (pwd.length < minLength) {
      return 'Password must be at least 6 characters long.';
    }
    if (!specialCharPattern.test(pwd)) {
      return 'Password must include at least one special character.';
    }
    if (!alphaNumericPattern.test(pwd)) {
      return 'Password must include at least one alphanumeric character.';
    }
    return null;
  };