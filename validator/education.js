const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateEducationInput(data) {
    data.school = isEmpty(data.school) ? '' : data.school;
    data.degree = isEmpty(data.degree) ? '' : data.degree;
    data.fieldofstudy = isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy;
    data.from = isEmpty(data.from) ? '' : data.from;
    let errors = {};

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required'
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required'
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Fieldofstudy field id required'
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'from field id required'
    }

    console.log('-------')
    console.log(JSON.stringify(errors));
    return {
        errors,
        isValid: isEmpty(errors)
    }
}