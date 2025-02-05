import React from "react";
 
const AlertMessage = ({ message }) => {
  if (!message) return null;
 
  return (
    <div
      className="alert alert-danger d-flex align-items-center alert-position mt-3"
      role="alert"
    >
      {message}
    </div>
  );
};
 
export default AlertMessage;