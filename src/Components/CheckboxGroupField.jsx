import React from "react";

const CheckboxGroupField = ({ label, name, options, value, onChange }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="d-flex flex-column">
        {options.map((option) => (
          <div key={option.value} className="form-check">
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="form-check-input"
            />
            <label htmlFor={`${name}-${option.value}`} className="form-check-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroupField;
