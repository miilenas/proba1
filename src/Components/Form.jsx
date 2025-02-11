import React from "react";

const Form = ({ fields, formData, setFormData, handleInputChange }) => {
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
              className="form-control"
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
              className="form-control"
              required={field.required}
            />
          </div>
        )
      )}
    </>
  );
};

export default Form;
