import React from "react";
 
const MessageCard = ({ message, onSolve, hideSolveButton }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{message.title}</h5>
          <p className="card-text">{message.content}</p>
          <p className="card-text">
            <strong>Status:</strong> {message.status}
          </p>
          <p className="card-text">
            <strong>Reviewed By:</strong>{" "}
            {message.reviewed_by || "Not Reviewed"}
          </p>
 
          {!hideSolveButton && message.status === "pending" && (
            <button className="btn btn-success" onClick={() => onSolve(message.id)}>
              Mark as Solved
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};
 
export default MessageCard;