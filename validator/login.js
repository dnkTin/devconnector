const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data) {
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    if (!Validator.isEmail(data.email)) {
        console.log(data.email);
        console.log('eeee');
        errors.email = 'Invalid email';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}