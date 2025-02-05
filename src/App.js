import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Login from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SupportDashboard from "./Pages/SupportDashboard";
import UserDashboard from "./Pages/UserDashboard";
import ProfilePage from "./Pages/ProfilePage";
function App() {
  const [userType, setUserType] = useState(null);
 
  useEffect(() => {
    const storedUserType = window.sessionStorage.getItem("user_type");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
 
  const handleLoginSuccess = (type) => {
    setUserType(type);
  };
 
  return (
    <Router>
      <div>
        {userType && <Navbar userType={userType} />}{" "}
        <Routes>
          <Route
            path="/"
            element={
              !userType ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div>
                  {userType === "admin" && <AdminDashboard />}
                  {userType === "support" && <SupportDashboard />}
                  {userType === "user" && <UserDashboard />}
                </div>
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/user/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;
 