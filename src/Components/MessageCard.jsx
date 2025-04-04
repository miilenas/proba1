import React from "react";
import "../CSS/ModalBackground.css";
 
const MessageCard = ({ message, onSolve, size = "m" }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card card-${size}`}>
        <div className="card-body  d-flex flex-column">
          <h5 className="card-title">{message.title}</h5>
          <p className="card-text">{message.content}</p>
          <p className="card-text">
            <strong>Status:</strong> {message.status}
          </p>
          <p className="card-text">
            <strong>Reviewed By:</strong>{" "}
            {message.reviewed_by || "Not Reviewed"}
          </p>
 
          {onSolve && message.status === "pending" && (
            <button className="btn btn-success mt-auto button-gray zoom" onClick={() => onSolve(message.id)}>
              Mark as Solved
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};
 
export default MessageCard;