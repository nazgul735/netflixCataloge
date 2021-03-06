"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateRegisterInput = void 0;
function validateRegisterInput({ username, email, password, confirmPassword }) {
    const errors = { username, email, password, confirmPassword };
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if (password === '') {
        errors.password = 'Password must not empty';
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
exports.validateRegisterInput = validateRegisterInput;
const validateLoginInput = (username, password) => {
    const errors = { username, password };
    if (username.trim() === '') {
        errors.username = 'Username needs value';
    }
    if (password.trim() === '') {
        errors.password = 'Password needs value';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validateLoginInput = validateLoginInput;
