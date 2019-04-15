import React from "react";

const Checkbox = ({ name, label, checked, error, ...rest }) => {
  return (
    <div className="checkbox">
      <label htmlFor={name}>
        {label}
        <input
          type="checkbox"
          {...rest}
          name={name}
          id={name}
          className="form-checkbox"
        />
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Checkbox;
