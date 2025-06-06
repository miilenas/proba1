import { useNavigate } from "react-router-dom";
import "../CSS/Card.css"


const AdminDashboard = () => {
  const navigate = useNavigate();
  return (

  <div className="container mt-5 pb-4">
      <div>
         <h2 className="pb-5">Admin Dashboard</h2>
      </div>

      <div className="row">
       <div className="col-md-3">
        
         <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/users")
            }}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage users</h2>
              <p className="admin-paragraf">-add new user</p>
              <p className="admin-paragraf">-update user</p>
            </div>
         </div>
         </div>

         <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/accounts")
            }}
           style={{ cursor: "pointer", textAlign: "center" }}
           >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage accounts</h2>
              <p className="admin-paragraf">-add new account</p>
              <p className="admin-paragraf">-delete account</p>
            </div>
            </div>
      </div>
      <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/admin/category")
            }}
           style={{ cursor: "pointer", textAlign: "center" }}
           >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage categories</h2>
              <p className="admin-paragraf">-add new category</p>
              <p className="admin-paragraf">-update category</p>
              <p className="admin-paragraf">-delete category</p>
            </div>
      </div>
      </div>

      <div className="col-md-3">
      <div
            className="card add-category-card card-l zoom"
            onClick={() => {
              navigate("/register")
            }}
           style={{ cursor: "pointer", textAlign: "center" }}
           >
            <div className="card-body">
              <h2 style={{ fontSize: "25px", color: "#0056b3" }}>Manage employees</h2>
              <br></br>
              <p className="admin-paragraf">-add employee</p>
            </div>
      </div>


    </div>
    </div>

  </div>
  );
};

export default AdminDashboard;
