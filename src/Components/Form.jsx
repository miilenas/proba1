import React from "react";
import CheckboxGroupField from "./CheckboxGroupField";

const Form = ({ fields, formData, setFormData, handleInputChange }) => {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          {/* Ako je checkbox grupa, koristi CheckboxGroupField */}
          {field.type === "checkbox" && field.options ? (
            <CheckboxGroupField
              label={field.label}
              name={field.name}
              options={field.options}
              value={formData[field.name] || ""}
              onChange={(selectedValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  [field.name]: selectedValue,
                }))
              }
            />
          ) : (
            // Ostali inputi ostaju isti
            <div>
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
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
