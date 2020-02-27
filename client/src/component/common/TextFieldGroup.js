import React from 'react'
import classnames from 'classnames';
import PropeTypes from 'prop-types';
const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
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
TextFieldGroup.propTypes = {
    name: PropeTypes.string.isRequired,
    placeholder: PropeTypes.string,
    value: PropeTypes.string.isRequired,
    info: PropeTypes.string,
    error: PropeTypes.string,
    type: PropeTypes.string.isRequired,
    onChange: PropeTypes.func.isRequired,
    disabled: PropeTypes.string,
};
TextFieldGroup.defaultProps = {
    type: 'text'
}
export default TextFieldGroup;