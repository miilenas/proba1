import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom  border-top pb-3 mb-3">
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-muted">
            Contact: +381111111
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-muted">
            Adress: Blabla
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link px-2 text-muted">
            Email: support@example.com
          </a>
        </li>
      </ul>
      <p className="text-center text-muted">© 2025 MAT Bank</p>
    </footer>
  );
};
export default Footer;
