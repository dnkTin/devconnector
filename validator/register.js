const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;
    let errors = {};
    if (!Validator.isLength(data.name), { min: 2, max: 30 }) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required'
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (Validator.isLength(data.password, { min: 6 })) {
        errors.password = 'Invalid password';
    }
    if (!Validator.equals(data.password2, data.password)) {
        errors.password = 'Invalid password';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}