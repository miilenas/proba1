import React from "react";

const Card = ({ title, data, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {typeof data === "object" && data !== null ? (
            Object.entries(data).map(([key, value], index) => (
              <p key={index}>
                <strong>{key}:</strong> {value}
              </p>
            ))
          ) : (
            <p>{data}</p>
          )}



          {onDelete && (
          <button className="btn btn-primary me-2" onClick={() => onDelete(data.id)}>
            Delete
          </button>
          )}
          {onEdit && (
            <button className="btn btn-warning" onClick={() => onEdit(data)}>
              Update
            </button>
          )}



        </div>
      </div>
    </div>
  );
};

export default Card;
