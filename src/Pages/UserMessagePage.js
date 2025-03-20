import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../Components/MessageCard";
import Modal from "../Components/Modal";
import "../CSS/ModalBackground.css";
import AlertModal from "../Components/AlertModal";

const UserMessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({ title: "", content: "" });
  

  const token = sessionStorage.getItem("access_token");
const [message, setMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched messages:", response.data);
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [token]);

  const handleAddMessage = (formData) => {
    const updatedMessage = { ...formData, id: Date.now() };

    axios
      .post("http://127.0.0.1:8000/api/user/messages", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessages((prevMessages) => [updatedMessage, ...prevMessages]);
        console.log(response);
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === updatedMessage.id ? response.data.data : message
          )
        );
        setShowModal(false);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          console.log(error);
          const errorArray = Object.values(error.response.data.errors);
          setMessage(errorArray);
          setTitle("Error");
        } else {
          setMessage(["Unexpected error."]);
        }
        setShowErrorModal(true);
        console.error("Error adding category:", error);
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== updatedMessage.id)
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-5">My Messages</h2>
      {showModal && <div className="modal-backdrop" />}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card add-message-card"
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer", textAlign: "center", padding: "20px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "50px", color: "#28a745" }}>+</h2>
              <p>Add new message</p>
            </div>
          </div>
        </div>

        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
            />
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          {
            name: "content",
            label: "Content",
            type: "textarea",
            required: true,
          },
        ]}
        onSubmit={handleAddMessage}
        formData={newMessage}
        setFormData={setNewMessage}
      />
      {showErrorModal && message && (
              <AlertModal
                title={title}
                message={message}
                onClose={() => setShowErrorModal(false)}
                type={title}
              />
            )}
    </div>
  );
};

export default UserMessagePage;
