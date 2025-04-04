import React from "react";
import  "../CSS/Card.css"

const Card = ({ title, data, dataText, onDelete, onEdit, buttonText, size="m" }) => {
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
              className="btn button-gray zoom"
              onClick={() => onDelete(data.id)}
            >
              Delete
            </button>
          )}
          {onEdit && (
            <button className="btn button-blue zoom" onClick={() => onEdit(data)}>
               {buttonText == null ? "Update" : buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
