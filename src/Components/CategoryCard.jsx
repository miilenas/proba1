import React from "react";

const CategoryCard = ({ category, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{category.type}</h5>
          <p className="card-text">{category.description}</p>

          <button className="btn btn-primary me-2" onClick={() => onDelete(category.id)}>
            Delete
          </button>
          <button className="btn btn-warning" onClick={() => onEdit(category)}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
