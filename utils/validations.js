const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validate = (username, email, password, setErrors, isLogin) => {
    const errors = {};
    console.log("dentro del validate")
    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length > 50) {
      errors.username = 'Username must be less than 50 characters';
    } else if (/\s/.test(username)) {
      errors.username = 'Username must not contain spaces';
    }
    if(!isLogin){
    if (!email) {
      errors.email = 'Email is required';
    } else if (email.length > 50) {
      errors.email = 'Email must be less than 50 characters';
    } else if (!validateEmail(email)) {
      errors.email = 'Email format is invalid';
    }
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length > 50) {
      errors.password = 'Password must be less than 50 characters';
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  