import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import "../CSS/ModalBackground.css";
import Pagination from "react-bootstrap/Pagination";
import AlertModal from "../Components/AlertModal";

const CategoryPage = () => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const [messages, setMessages] = useState(null);
  const [title, setTitle] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const token = sessionStorage.getItem("access_token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Response data:", response.data);
          setCategories(response.data["transaction categories"]);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [token]);

  const handleDelete = (category) => {
    axios
      .delete(`http://127.0.0.1:8000/api/admin/category/${category}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log(categories);
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== category)
        );
        setMessages("Successfully deleted transaction category.");
        setTitle("Success");
        setShowErrorModal(true);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleOpenEditModal = (category) => {
    if (category) {
      setSelectedCategory({ ...category });
      setShowModalEdit(true);
    }
  };

  const handleEdit = (formData) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/admin/category/${selectedCategory.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === selectedCategory.id
              ? response.data.category
              : category
          )
        );
        setShowModalEdit(false);
        setSelectedCategory(null);
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
        console.error("Error editing category:", error);
      });
  };

  const handleAdd = (formData) => {
    axios
      .post("http://127.0.0.1:8000/api/admin/category", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCategories((prevCategories) => [
          ...prevCategories,
          response.data.category,
        ]);
        setShowModalAdd(false);
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          console.log(error);
          const errorArray = Object.values(error.response.data.errors);
          setMessages(errorArray);
          setTitle("Error");
        } else {
          setMessages(["Unexpected error."]);
        }
        setShowErrorModal(true);
        console.error("Error adding category:", error);
      });
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2>Transaction Categories</h2>
      {showModalAdd && <div className="modal-backdrop" />}
      {showModalEdit && <div className="modal-backdrop" />}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card add-category-card card-s"
            onClick={() => {
              setFormData({ type: "", description: "" });
              setShowModalAdd(true);
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "20px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "50px", color: "#28a745" }}>+</h2>
              <p>Add new transaction category</p>
            </div>
          </div>
        </div>

        {currentCategories.length > 0 ? (
          currentCategories.map((category) => (
            <Card
              key={category.id}
              title={category.type}
              data={category}
              dataText={{
                description: category.description,
              }}
              onDelete={handleDelete}
              onEdit={() => handleOpenEditModal(category)}
              size="s"
            />
          ))
        ) : (
          <p>No transaction category available.</p>
        )}
      </div>

      <div className="d-flex justify-content-center my-4">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal
        show={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        fields={[
          {
            name: "type",
            label: "Category Type",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
        ]}
        onSubmit={handleAdd}
        formData={formData}
        setFormData={setFormData}
      />

      <Modal
        show={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        fields={[
          {
            name: "type",
            label: "Category Type",
            type: "text",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
        ]}
        onSubmit={handleEdit}
        formData={selectedCategory}
        setFormData={setSelectedCategory}
      />
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

export default CategoryPage;
