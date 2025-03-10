import React from "react";
import "../CSS/ModalBackground.css";
const AlertModal = ({ title, message, onClose, type }) => {
  if (!message) return null;
  const modalClass = type === "Success" ? "bg-success" : "bg-danger";
  const messageArray = Array.isArray(message) ? message : [message];

  return (
    <>
      <div className="modal-backdrop"></div>

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered ">
          <div className={`modal-content ${modalClass} text-white`}>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {messageArray.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;
