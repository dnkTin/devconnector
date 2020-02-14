const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostInput(data) {
    data.text = isEmpty(data.text) ? '' : data.text;
    let errors = {};

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text is required'
    }

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Text length invalid'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}