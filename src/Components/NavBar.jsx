import React from "react";

const Navbar = ({ userType }) => {
  const getLinksForUser = (userType) => {
    switch (userType) {
      case "admin":
        return [
          { name: "Manage users", path: "/manage-users" },
          { name: "Manage accounts", path: "/manage-accounts" },
          { name: "Manage transaction categories", path: "/manage-categories" },
          { name: "Manage employees", path: "/manage-empoyees" },
          { name: "Logout", path: "/logout" },
        ];
      case "user":
        return [
          { name: "Currencies", path: "/currencies" },
          { name: "Messages", path: "/messages" },
          { name: "Profile", path: "/profile" },
          { name: "Logout", path: "/logout" },
        ];
      case "support":
        return [
          { name: "Logout", path: "/logout" },
        ];
      case "untautorized":
        return [
          { name: "Logout", path: "/logout" },
        ];
      default:
        return [];
    }
  };

  const links = getLinksForUser(userType);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h1>e-Banking</h1>
      </div>
      <ul style={styles.navLinks}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.path} style={styles.link}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    width:"96vw",
    height:60,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1rem",
    backgroundColor: "#ffcfd2",
  },
  logo: {
    fontSize: "2rem",
    color: "#6d6875",
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    gap: "2rem",
  },
  link: {
    textDecoration: "none",
    color: "#6d6875",
    fontSize: "1.1rem",
    transition: "color 0.3s",
  },
};

export default Navbar;
