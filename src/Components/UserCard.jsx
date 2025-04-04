import React from "react";
import "../CSS/UserCard.css";

const UserCard = ({
  accountNumber,
  balance,
  currency,
  firstName,
  lastName,
  isSelected,
}) => {
  return (
    <div
      className={`user-card ${isSelected ? "selected" : "zoom-no-centered"} `}
      style={{ width: "18rem" }}
    >
      <div className="user-card-body ">
        <h5 className="user-card-title">Account: {accountNumber}</h5>
        <h6 className="user-card-text">
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
