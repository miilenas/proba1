import React, { useState } from "react";
import Form from "./Form";

const Modal = ({
  show,
  onClose,
  fields,
  onSubmit,
  formData,
  setFormData,
  modalTitle,
  acceptButton,
}) => {
  if (!formData) return null;
  const handleSubmit = () => {
    console.log(formData);
    onSubmit(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{backgroundColor: "#0056b3", color: "white"}}>
            <h5 className="modal-title">
              {modalTitle ? modalTitle : "Enter data"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <Form
              fields={fields}
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary button-blue"
              onClick={handleSubmit}
            >
              {acceptButton ? acceptButton : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
