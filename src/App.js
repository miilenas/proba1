import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Login from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SupportDashboard from "./Pages/SupportDashboard";
import UserDashboard from "./Pages/UserDashboard";
import ProfilePage from "./Pages/ProfilePage";
import CategoryPage from "./Pages/CategoryPage";
import RegisterEmployeePage from "./Pages/RegisterEmployeePage";
import ManageUserPage from "./Pages/ManageUserPage";
import ManageAccountPage from "./Pages/AccountPage";
import UserMessagePage from "./Pages/UserMessagePage";
import CurrencyPage from "./Pages/CurrencyPage";
import Footer from "./Components/Footer";
import TransactionPage from "./Pages/TransactionsPage";

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

  const handleLogout = () => {
    setUserType(null);
  };

  return (
    <Router>
      <div>
        {userType && <Navbar userType={userType} onLogout={handleLogout} />}{" "}
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

          <Route path="/admin/category" element={<CategoryPage />} />

          <Route path="/register" element={<RegisterEmployeePage />} />

          <Route path="/admin/users" element={<ManageUserPage />} />

          <Route path="/admin/accounts" element={<ManageAccountPage />} />

          <Route path="/user/messages" element={<UserMessagePage />} />

          <Route path="/currency" element={<CurrencyPage />} />

          <Route path="/user/accounts" element={<UserDashboard />} />

          <Route
            path="/user/account/transactions"
            element={<TransactionPage />}
          />
        </Routes>
        {userType && <Footer />}
      </div>
    </Router>
  );
}

export default App;
