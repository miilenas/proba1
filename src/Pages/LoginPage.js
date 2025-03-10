import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Components/AlertModal";
import Form from "../Components/Form";

const Login = ({ onLoginSuccess }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const storedUserType = window.sessionStorage.getItem("user_type");
    if (storedUserType) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    console.log("Login form submitted!");
    setLoginError(null);
    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then((res) => {
        if (res.status === 200 && res.data.access_token) {
          window.sessionStorage.setItem("access_token", res.data.access_token);
          window.sessionStorage.setItem("user_type", res.data.user_type);
          console.log("Access token saved in sessionStorage");
          if (onLoginSuccess) {
            console.log(
              "Login success callback triggered with user type:",
              res.data.user_type
            );
            onLoginSuccess(res.data.user_type);
            navigate("/", { replace: true });
          }
        } else {
          console.log("Login failed or no access token received.");
        }
      })
      .catch((e) => {
        console.log("Login error:", e.response?.data?.message || e.message);
        setLoginError(
          e.response?.data?.message || "An unexpected error occurred."
        );
      });
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <Form
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              required: true,
            },
          ]}
          formData={userData}
          handleInputChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
        <ErrorModal message={loginError} />
      </form>
    </div>
  );
};

export default Login;
