import React from "react";
import "../CSS/UserCard.css";

const UserCard = ({
  accountNumber,
  balance,
  currency,
  firstName,
  lastName,
}) => {
  return (
    <div className="user-card" style={{ width: "18rem" }}>
      <div className="user-card-body ">
        <h5 className="user-card-title">Account: {accountNumber}</h5>
        <h6 className="user-card-subtitle mb-2 text-muted">
          {firstName} {lastName}
        </h6>
        <p className="user-card-text">
          Balance: {balance.toFixed(2)} {currency}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
