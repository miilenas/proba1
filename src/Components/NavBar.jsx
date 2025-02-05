import React from "react";
import { Link, useNavigate } from "react-router-dom";
 
const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const getLinksForUser = (userType) => {
    switch (userType) {
      case "admin":
        return [
          { name: "Manage Users", path: "/manage-users" },
          { name: "Manage Accounts", path: "/manage-accounts" },
          { name: "Manage Categories", path: "/manage-categories" },
          { name: "Manage Employees", path: "/manage-employees" },
          { name: "Logout", path: "/logout", action: true },
        ];
      case "user":
        return [
          { name: "Currencies", path: "/currencies" },
          { name: "Messages", path: "/messages" },
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
    navigate("/login");
  };
 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
                  <button className="nav-link border-0" onClick={handleLogout}>
                    {link.name}
                  </button>
                ) : (
                  <Link className="nav-link" to={link.path}>
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