import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Modal from "../Components/Modal";

const CategoryPage = () => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [alertMessage, setAlertMessage] = useState("");

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
    console.log(category);
    axios
      .delete(`http://127.0.0.1:8000/api/admin/category/${category}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.type !== category)
        );
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
        console.error("Error adding category:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Transaction Categories</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card add-category-card"
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

        {categories.length > 0 ? (
          categories.map((category) => (
            <Card
              key={category.id}
              title={category.type}
              data={category}
              dataText={{
                description: category.description,
              }}
              onDelete={handleDelete}
              onEdit={() => handleOpenEditModal(category)}
            />
          ))
        ) : (
          <p>No transaction category available.</p>
        )}
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
    </div>
  );
};

export default CategoryPage;
