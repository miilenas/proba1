import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import "../CSS/Card.css"


const AdminDashboard = () => {
  const navigate = useNavigate();
  return (

  <div className="container mt-5 pb-4">
      <div>
         <h2 class="pb-5">Admin Dashboard</h2>
      </div>

      <div className="row">
       <div className="col-md-3">
        
         <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/users")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage users</h2>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-add new user</p>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-update user</p>
            </div>
         </div>
         </div>

         <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/accounts")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
      >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage accounts</h2>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-add new account</p>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-delete account</p>
            </div>
            </div>
      </div>
      <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/category")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "30px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage categories</h2>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-add new category</p>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-update category</p>
              <p style={{fontSize: "17px", margin: "5px 0" }}>-delete category</p>
            </div>
      </div>
      </div>

      <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/register")
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "40px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage employees</h2>
              <br></br>
              <p style={{ fontSize: "17px"}}>-add new employee</p>
            </div>
      </div>


    </div>
    </div>

  </div>
  );
};

export default AdminDashboard;
