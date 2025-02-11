import React, { useState } from "react";
import axios from "axios";
import Form from "../Components/Form";
import AlertMessage from "../Components/AlertMessage";

const RegisterEmployeePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "support",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const token = window.sessionStorage.getItem("access_token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      setErrorMessage("Fill in all fields!");
      return;
    }

    console.log("Sending data:", formData);

    axios
      .post("http://127.0.0.1:8000/api/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response from backend:", response.data);

        if (response.data.access_token) {
          window.sessionStorage.setItem(
            "access_token",
            response.data.access_token
          );
          console.log(
            "Token saved in sessionStorage:",
            response.data.access_token
          );
        }

        setSuccessMessage("User successfully registered!");
        setErrorMessage("");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register Employee</h2>

      {errorMessage && <AlertMessage message={errorMessage} />}
      {successMessage && <AlertMessage message={successMessage} />}

      {showForm && (
        <form onSubmit={handleRegister}>
          <Form
            fields={[
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "password",
                label: "Password",
                type: "password",
                required: true,
              },
              {
                name: "role",
                label: "Role",
                type: "radio",
                options: [
                  { value: "support", label: "Support" },
                  { value: "admin", label: "Admin" },
                ],
              },
            ]}
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterEmployeePage;
