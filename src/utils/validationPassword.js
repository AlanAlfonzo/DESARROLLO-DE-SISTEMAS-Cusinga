
function validatePassword(password) {
    const minLength = 6;
    const maxLength = 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
        throw new Error('La contraseña debe tener entre 6 y 16 caracteres.');
    }
    if (!hasUpperCase) {
        throw new Error('La contraseña debe contener al menos una letra mayúscula.');
    }
    if (!hasLowerCase) {
        throw new Error('La contraseña debe contener al menos una letra minúscula.');
    }
    if (!hasDigit) {
        throw new Error('La contraseña debe contener al menos un número.');
    }
    if (!hasSpecialChar) {
        throw new Error('La contraseña debe contener al menos un carácter especial.');
    }
}

module.exports = validatePassword
