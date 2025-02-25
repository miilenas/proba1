import React, { useState } from "react";
import axios from "axios";
 
const Login = ({ onLoginSuccess }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
 
  function handleLogin(e) {
    e.preventDefault();
    console.log("Login form submitted!");
 
    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then((res) => {
        if (res.status === 200 && res.data.access_token) {
          window.sessionStorage.setItem("access_token", res.data.access_token);
          console.log("Access token saved in sessionStorage");
 
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else {
          console.log("Login failed or no access token received.");
        }
      })
      .catch((e) => {
        console.log("Error:", e.response ? e.response.data : e);
      });
  }
 
  /*function handleLogin(e) {
    e.preventDefault();
    console.log("Login form submitted!");
    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }*/
 
  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
 
export default Login;
