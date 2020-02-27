import React from 'react'
import classnames from 'classnames';
import PropeTypes from 'prop-types';
const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(opt =>
        (<option key={opt.lable} value={opt.value}>
            {opt.label}
        </option>)
    )
    return (
        <div className="form-group">
            <select
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
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
SelectListGroup.propTypes = {
    name: PropeTypes.string.isRequired,
    value: PropeTypes.string.isRequired,
    info: PropeTypes.string,
    error: PropeTypes.string,
    onChange: PropeTypes.func.isRequired,
    options: PropeTypes.array.isRequired,
};

export default SelectListGroup;