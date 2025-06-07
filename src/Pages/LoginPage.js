import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertModal from "../Components/AlertModal";
import Form from "../Components/Form";
import logo from "../Images/logo.png";
import { usePlainTextForm } from "../Hooks/usePlainTextForm.ts";
import "../CSS/LoginPage.css";

const Login = ({ onLoginSuccess }) => {
  const {
    form: userData,
    handleChange,
    getPlainForm,
  } = usePlainTextForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [ErrorModal, setErrorModal] = useState(false);
  const [Messages, setMessages] = useState(false);
  const [Title, setTitle] = useState(false);

  useEffect(() => {
    const storedUserType = window.sessionStorage.getItem("user_type");
    if (storedUserType) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", getPlainForm())
      .then((res) => {
        if (res.status === 200 && res.data.access_token) {
          window.sessionStorage.setItem("access_token", res.data.access_token);
          window.sessionStorage.setItem("user_type", res.data.user_type);
          window.sessionStorage.setItem("user_id", res.data.user_id);
        
          console.log("Access token saved in sessionStorage");
          if (onLoginSuccess) {
            console.log(
              "Login success callback triggered with user type:",
              res.data.user_type
            );
            onLoginSuccess(res.data.user_type);
            navigate("/", { replace: true });
          }
        }
      })
      .catch((error) => {
        /* console.log("Login error:", e.response?.data?.message || e.message);
        setLoginError(
          e.response?.data?.message || "An unexpected error occurred."
        );*/

        if (error.response && error.response.data.errors) {
          console.log(error);
          const errorArray =
            typeof error.response.data.errors === "string"
              ? [error.response.data.errors]
              : Object.values(error.response.data.errors).flat();
          setMessages(errorArray);
          setTitle("Error");
        } else {
          setMessages(["Unexpected error."]);
        }
        setErrorModal(true);
        console.error("Error login:", error);
      });
  }

  return (
    <div className="login-page">
      <img
        src={logo}
        alt="logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          height: "50px",
        }}
      />

      <div className="center-form-container">
        <form onSubmit={handleLogin}>
          <h2 className="text-center fw-bold ">Login</h2>
          <Form
            fields={[
              {
                name: "email",
                label: "Email",
                type: "email",
                required: true,
                className: "small-input",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                required: true,
                className: "small-input",
              },
            ]}
            formData={userData}
            handleInputChange={handleChange}
          />
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
        {ErrorModal && Messages && (
          <AlertModal
            title={Title}
            message={Messages}
            onClose={() => setErrorModal(false)}
            type={Title}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
