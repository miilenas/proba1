import React from "react";

const Form = ({ fields, formData, setFormData, handleInputChange }) => {
  return (
    <form>
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
    </form>
  );
};

export default Form;
