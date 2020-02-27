import React from 'react'
import classnames from 'classnames';
import PropeTypes from 'prop-types';
const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
}) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {
                info && <small className="form-text text-muted">{info}</small>
            }
            {
                error &&
                (<div className="invalid-feedback">{error}</div>)
            }
        </div>
    )
}
TextAreaFieldGroup.propTypes = {
    name: PropeTypes.string.isRequired,
    placeholder: PropeTypes.string,
    value: PropeTypes.string.isRequired,
    info: PropeTypes.string,
    error: PropeTypes.string,
    onChange: PropeTypes.func.isRequired,
};

export default TextAreaFieldGroup;