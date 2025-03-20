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
            className="card add-category-card card-s"
            onClick={() => {
              navigate("/admin/users")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "50px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage users</h2>
            </div>
         </div>
         </div>

         <div className="col-md-3">
      <div
            className="card add-category-card card-s"
            onClick={() => {
              navigate("/admin/accounts")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "50px" }}
      >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage accounts</h2>
            </div>
            </div>
      </div>
      <div className="col-md-3">
      <div
            className="card add-category-card card-s"
            onClick={() => {
              navigate("/admin/category")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "50px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage categories</h2>
            </div>
      </div>
      </div>

      <div className="col-md-3">
      <div
            className="card add-category-card card-s"
            onClick={() => {
              navigate("/register")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "50px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#28a745" }}>Manage employees</h2>
            </div>
      </div>


    </div>
    </div>

  </div>
  );
};

export default AdminDashboard;
