import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";


const AdminDashboard = () => {
  const navigate = useNavigate();
  return (

  <div className="container mt-5">
      <div>
         <h2>Admin Dashboard</h2>
      </div>

      <div className="row">
       <div className="col-md-3">
        
         <div
            className="card add-category-card card-l"
            onClick={() => {
              navigate("/admin/users")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage users</h2>
              <p style={{ margin: "5px 0" }}>-add new user</p>
              <p style={{ margin: "5px 0" }}>-update user</p>
            </div>
         </div>
         </div>

         <div className="col-md-3">
      <div
            className="card add-category-card card-l"
            onClick={() => {
              navigate("/admin/accounts")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
      >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage accounts</h2>
              <p style={{ margin: "5px 0" }}>-add new account</p>
              <p style={{ margin: "5px 0" }}>-delete account</p>
            </div>
            </div>
      </div>
      <div className="col-md-3">
      <div
            className="card add-category-card card-l"
            onClick={() => {
              navigate("/admin/category")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "30px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage categories</h2>
              <p style={{ margin: "5px 0" }}>-add new category</p>
              <p style={{ margin: "5px 0" }}>-update category</p>
              <p style={{ margin: "5px 0" }}>-delete category</p>
            </div>
      </div>
      </div>

      <div className="col-md-3">
      <div
            className="card add-category-card card-l"
            onClick={() => {
              navigate("/register")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage employees</h2>
              <p>-add new employee</p>
            </div>
      </div>


    </div>
    </div>

  </div>
  );
};

export default AdminDashboard;
