const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validate = (username, email, password, setErrors, isLogin) => {
    const errors = {};
    //console.log("dentro del validate")
    if (!username) {
      errors.username = 'Se requiere nombre de usuario.';
    } else if (username.length > 50) {
      errors.username = 'El nombre de usuario debe tener menos de 50 caracteres.';
    } else if (/\s/.test(username)) {
      errors.username = 'El nombre de usuario no debe tener espacios.';
    }
    if(!isLogin){
    if (!email) {
      errors.email = 'Correo electrónico obligatorio.';
    } else if (email.length > 50) {
      errors.email = 'El email debe tener menos de 50 caracteres.';
    } else if (!validateEmail(email)) {
      errors.email = 'El Email no debe tener espacios. ';
    }
    }
    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (password.length > 50) {
      errors.password = 'La contraseña debe tener menos de 50 caracteres';
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  