import React from "react";
import "../CSS/NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ userType, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getLinksForUser = (userType) => {
    switch (userType) {
      case "admin":
        return [
          { name: "Manage Users", path: "/admin/users" },
          { name: "Manage Accounts", path: "/admin/accounts" },
          { name: "Manage Categories", path: "/admin/category" },
          { name: "Manage Employees", path: "/register" },
          { name: "Logout", path: "/logout", action: true },
        ];
      case "user":
        return [
          { name: "Currencies", path: "/currency" },
          { name: "Messages", path: "/user/messages" },
          { name: "Profile", path: "/user/profile" },
          { name: "Logout", path: "/logout", action: true },
        ];
      case "support":
        return [{ name: "Logout", path: "/logout", action: true }];
      case "unauthorized":
        return [{ name: "Login", path: "/login" }];
      default:
        return [];
    }
  };

  const links = getLinksForUser(userType);

  const handleLogout = () => {
    window.sessionStorage.removeItem("user_type");
    window.sessionStorage.removeItem("access_token");
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          e-Banking
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                {link.action ? (
                  <Link
                    className={`nav-link ${
                      location.pathname === link.path ? "active" : ""
                    }`}
                    to="/login"
                    onClick={handleLogout}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    className={`nav-link ${
                      location.pathname === link.path ? "active" : ""
                    }`}
                    to={link.path}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
