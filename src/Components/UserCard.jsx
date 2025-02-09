import React from "react";

const UserCard = ({ user, onEdit, buttonText = "Update"  }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.first_name} {user.last_name}</h5>
          <p className="card-text"><strong>ID:</strong> {user.id}</p>
          <p className="card-text"><strong>JMBG:</strong> {user.jmbg}</p>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>

          <button className="btn btn-warning" onClick={() => onEdit(user)}>
          {buttonText}
          </button>
           
        </div>
      </div>
    </div>
  );
};

export default UserCard;
