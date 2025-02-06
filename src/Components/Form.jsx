import React, { useState } from "react";
const Form = ({ fields, formData, handleInputChange, showRadio }) => {
  return (
    <form>
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className="form-control"
            required={field.required}
          />
        </div>
      ))}

      {showRadio && (
        <div className="mb-3">
          <label className="form-label">Role</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="support"
              checked={formData.role === "support"}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Support</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Admin</label>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form
