
function validateString(username) {

    const minLength = 5;
    const maxLength = 22;
    const hasSpecialChar = /[@$!%*?&]/.test(username);

    if (password.length < minLength || password.length > maxLength) {
        throw new Error('La contraseña debe tener entre 6 y 16 caracteres.');
    }

    if (!hasSpecialChar) {
        throw new Error('La contraseña debe contener al menos un carácter especial.');
    }
}

module.exports = validateString
