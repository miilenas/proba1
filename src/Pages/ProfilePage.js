import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = window.sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://127.0.0.1:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data.data))
        .catch(() => navigate("/login"));
    }
  }, [navigate]);
 
  if (!userData) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="container mt-5">
      <h2>Profile Details</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>First Name:</strong> {userData.first_name}
        </li>
        <li className="list-group-item">
          <strong>Last Name:</strong> {userData.last_name}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {userData.email}
        </li>
        <li className="list-group-item">
          <strong>JMBG:</strong> {userData.jmbg}
        </li>
      </ul>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Back to Dashboard
      </button>
    </div>
  );
};
 
export default ProfilePage;