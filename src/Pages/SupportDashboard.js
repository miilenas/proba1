import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../Components/MessageCard";
 
const SupportDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [unsolvedMessages, setUnsolvedMessages] = useState([]);
  const [showUnsolved, setShowUnsolved] = useState(false);
  const token = sessionStorage.getItem("access_token");
 
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/support/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response data:", response.data);
          setMessages(response.data.messages);
          setUnsolvedMessages(
            response.data.messages.filter(
              (message) => message.status === "pending"
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [token]);
 
  const handleShowUnsolved = () => {
    setShowUnsolved(!showUnsolved);
  };
 
  const handleSolve = (messageId) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/support/messages/${messageId}/solve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedMessage = response.data.data;
 
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  status: updatedMessage.status,
                  reviewed_by: updatedMessage.reviewed_by,
                }
              : msg
          )
        );
 
        setUnsolvedMessages((prevUnsolved) =>
          prevUnsolved.filter((msg) => msg.id !== messageId)
        );
      })
      .catch((error) => {
        console.error("Error solving message:", error);
      });
  };
  const renderMessages = showUnsolved ? unsolvedMessages : messages;
 
  return (
    <div className="container mt-5">
      <button className="btn btn-primary mb-4" onClick={handleShowUnsolved}>
        {showUnsolved ? "Show All Messages" : "Show Unsolved Messages"}
      </button>
 
      <div className="row">
        {renderMessages.length > 0 ? (
          renderMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onSolve={handleSolve}
            />
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};
 
export default SupportDashboard;