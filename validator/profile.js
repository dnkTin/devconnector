const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;
    let errors = {};

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle is required'
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status is required'
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills are required'
    }

    if (!isEmpty(data.website) && !Validator.isURL(data.website)) {
        errors.skills = 'Invalid URL';
    }
    if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
        errors.skills = 'Invalid URL';
    }
    if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
        errors.skills = 'Invalid URL';
    }
    if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) {
        errors.skills = 'Invalid URL';
    }
    if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
        errors.skills = 'Invalid URL';
    }
    if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
        errors.skills = 'Invalid URL';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}