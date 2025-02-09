import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard";
import Modal from "../Components/Modal";

const ManageUserPage = () => {
    const [formData, setFormData] = useState({ jmbg: "", first_name: "", last_name:"",email:"" });  
  const [users, setUsers] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [token]);

  const handleOpenEditModal = (user) => {
    if (user) {
    setSelectedUser({ ...user });
    setShowModalEdit(true);
    }
  };

  const handleEdit = (formData) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/admin/user/${selectedUser.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? response.data.user : user
          )
        );
        setShowModalEdit(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleAdd = (formData) => {
    console.log("Podaci na serv", formData);
    axios
      .post(
        "http://127.0.0.1:8000/api/admin/user",
        { ...formData, password: formData.password || "password" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setShowModalAdd(false);
        setFormData({ jmbg: "", first_name: "", last_name: "", email: "", password: "" });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        console.log("Greska pri dodavanju");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Available Users</h2>

      <div className="row">
      <div className="col-md-4 mb-4">
        <div
            className="card add-category-card"
            onClick={() => {
              setFormData({jmbg: "",first_name: "", last_name: "", email: "" }); 
              setShowModalAdd(true);
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "20px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "50px", color: "#28a745" }}>+</h2>
              <p>Add new user</p>
            </div>
          </div>
        </div>
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleOpenEditModal} buttonType="update" />
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>

      <Modal
        show={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        fields={[
          { name: "first_name", label: "First Name", type: "text", required: true },
          { name: "last_name", label: "Last Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
        onSubmit={handleEdit}
        formData={selectedUser}
        setFormData={setSelectedUser}
      />

      <Modal
        show={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        fields={[
            { name: "jmbg", label: "Jmbg", type: "text", required: true },
            { name: "first_name", label: "First Name", type: "text", required: true },
            { name: "last_name", label: "Last Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "password", label: "Password", type: "password", required: true },
          ]}
        onSubmit={handleAdd}
        formData={formData} 
        setFormData={setFormData} 
      />
    </div>
  );
};

export default ManageUserPage;