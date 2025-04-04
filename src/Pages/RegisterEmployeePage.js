import React, { useState } from "react";
import axios from "axios";
import Form from "../Components/Form";
import AlertModal from "../Components/AlertModal";

const RegisterEmployeePage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "support",
  });
  const [showErrorModal, setShowErrorModal] = useState("");
  const [messages, setMessages] = useState(null);
  const[title, setTitle]=useState("");
  const [showForm, setShowForm] = useState(true);
  const token = window.sessionStorage.getItem("access_token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

   /* if (!formData.email || !formData.password || !formData.role) {
      setMessages("Fill in all fields!");
      setTitle("Error");
      setShowErrorModal(true);
      return;
    } */

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

        setMessages("Successfully registered employee.");
        setTitle("Success");
        setShowErrorModal(true);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          const errorArray = Object.values(error.response.data.errors);
          setMessages(errorArray);
          setTitle("Error");
        } else {
          setMessages(["Unexpected error."]);
        }
        setShowErrorModal(true);
        console.error(error);
      });
  };

  return (
      <div className="center-form-container">
      {showForm && (
        <form onSubmit={handleRegister}>
          <h2 className="text-center" style={{color: "#0056b3"}}>Register Employee</h2>
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

          <button type="submit" className="btn btn-primary mt-3 button-blue d-block mx-auto" style={{position: "centered"}}>
            Register
          </button>
        </form>
      )}
       {showErrorModal && messages && (
        <AlertModal
          title={title}
          message={messages}
          onClose={() => setShowErrorModal(false)}
          type={title}
        />
      )}
    </div>
  );
};

export default RegisterEmployeePage;
