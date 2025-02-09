import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../Components/MessageCard";
import Modal from "../Components/Modal";

const UserMessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({ title: "", content: "" });

  const token = sessionStorage.getItem("access_token");
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


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/messages")
      .then((response) => {
        console.log("Fetched messages:", response.data);
        setMessages(response.data.messages); // Pristupamo kroz `messages`
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  const handleAddMessage = (formData) => {
    const token = sessionStorage.getItem("access_token");
  
    axios
      .post(
        "http://127.0.0.1:8000/api/user/messages",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setShowModal(false);
       // setShowModal({ title: "", content: "" });
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };
  

  return (
    <div className="container mt-5">
      <h2>My Messages</h2>

    
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


      <div className="row">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard key={message.id} message={message} onSolve={() => {}} hideSolveButton={true} />
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
          { name: "content", label: "Content", type: "textarea", required: true },
        ]}
        onSubmit={handleAddMessage}
        formData={newMessage}
        setFormData={setNewMessage}
      />
    </div>
  );
};

export default UserMessagePage;
