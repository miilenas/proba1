import React from "react";

const Card = ({ title, data, dataText, onDelete, onEdit, size="m" }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card card-${size}`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {dataText !== null ? (
            Object.entries(dataText).map(([key, value], index) => (
              <p key={index}>
                <strong>{key}:</strong> {value}
              </p>
            ))
          ) : (
            <p>{data}</p>
          )}

          {onDelete && (
            <button
              className="btn btn-primary me-2"
              onClick={() => onDelete(data.id)}
            >
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
