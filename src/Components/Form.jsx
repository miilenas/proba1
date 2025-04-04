import React from "react";
import "../CSS/Form.css";

const Form = ({ fields, formData, handleInputChange }) => {
  return (
    <>
      {fields.map((field) =>
        field.type === "select" && field.options ? (
          <div key={field.name}>
            <label className="form-label">{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="form-control label-size"
              //className={`form-control ${field.className || "small-input"}`}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : field.type === "radio" && field.options ? (
          <div key={field.name}>
            <label className="form-label">{field.label}</label>
            {field.options.map((option) => (
              <div key={option.value} className="form-check">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label">{option.label}</label>
              </div>
            ))}
          </div>
        ) : (
          <div key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="form-control label-size"
              //className={`form-control ${field.className || "small-input"}`}
              required={field.required}
              readOnly={field.readOnly || false}
            />
          </div>
        )
      )}
    </>
  );
};

export default Form;
