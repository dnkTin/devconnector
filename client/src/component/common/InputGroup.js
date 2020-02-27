import React from 'react'
import classnames from 'classnames';
import PropeTypes from 'prop-types';
const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    type,
    onChange,
    icon
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}> </i>
                </span>
            </div>
            <input
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />

            {
                error &&
                (<div className="invalid-feedback">{error}</div>)
            }
        </div>
    )
}
InputGroup.propTypes = {
    name: PropeTypes.string.isRequired,
    placeholder: PropeTypes.string,
    value: PropeTypes.string.isRequired,
    type: PropeTypes.string,
    error: PropeTypes.string,
    type: PropeTypes.string.isRequired,
    onChange: PropeTypes.func.isRequired,
    icon: PropeTypes.string,
};
InputGroup.defaultProps = {
    type: 'text'
}
export default InputGroup;