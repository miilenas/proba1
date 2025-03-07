import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import Pagination from "react-bootstrap/Pagination";
import "../CSS/ModalBackground.css";
const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [formData, setFormData] = useState({
    account_number: "",
    balance: "",
    owner_id: "",
    currency_id: "",
    type: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOwners(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/admin/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAccounts(response.data.accounts);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/currency", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrencies(response.data.currencies);
      })
      .catch((error) => {
        console.error("Error fetching currency:", error);
      });
  }, [token]);

  const handleDelete = (accountId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/admin/account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAccounts((prevAccounts) =>
          prevAccounts.filter((acc) => acc.id !== accountId)
        );
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const handleAdd = (formData) => {
    const currency_id = formData.currency_id || currencies[0]?.id;
    const owner_id = formData.owner_id || owners[0]?.id;
    const balance = parseFloat(formData.balance);
    const dataToSend = {
      account_number: formData.account_number,
      balance: balance,
      type: formData.type,
      currency_id: currency_id,
      owner_id: owner_id,
    };

    axios
      .post("http://127.0.0.1:8000/api/admin/account", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAccounts((prevAccounts) => [...prevAccounts, response.data.account]);
        setShowModalAdd(false);
      })
      .catch((error) => {
        console.error("Error adding account:", error);
      });
  };

  const indexOfLastAccount = currentPage * itemsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - itemsPerPage;
  const currentAccounts = accounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2>Accounts</h2>
      {showModalAdd && <div className="modal-backdrop" />}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card add-category-card"
            onClick={() => {
              setFormData({
                account_number: "",
                balance: "",
                type: "",
                currency_id: "",
                owner_id: "",
              });
              setShowModalAdd(true);
            }}
            style={{ cursor: "pointer", textAlign: "center", padding: "20px" }}
          >
            <div className="card-body">
              <h2 style={{ fontSize: "50px", color: "#28a745" }}>+</h2>
              <p>Add new account</p>
            </div>
          </div>
        </div>

        {currentAccounts.length > 0 ? (
          currentAccounts.map((account) => (
            <Card
              key={account.id}
              title={account.account_number}
              data={account}
              dataText={{
                Type: account.type,
                Owner: ` ${account.owner.first_name} ${account.owner.last_name}`,
                Balance: `${account.balance} ${account.currency.name}`,
              }}
              onDelete={() => handleDelete(account.id)}
            />
          ))
        ) : (
          <p>No accounts available.</p>
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
            name: "account_number",
            label: "Account Number",
            type: "text",
            required: true,
          },
          { name: "balance", label: "Balance", type: "number", required: true },
          { name: "type", label: "Type", type: "text", required: true },
          {
            name: "currency_id",
            label: "Currency",
            type: "select",
            options: currencies.map((c) => ({
              value: c.id,
              label: `${c.name}`,
            })),
            onChange: (e) => {
              setFormData((prev) => ({
                ...prev,
                currency: e.target.value,
                // currencies: selectedCurrency,
                // type: selectedCurrency === "RSD" ? "RSD Account" : "Foreign Exchange", // Postavljanje 'type' na osnovu valute
              }));
            },
          },
          {
            name: "owner_id",
            label: "Owner",
            type: "select",
            options: owners.map((o) => ({
              value: o.id,
              label: `${o.first_name} ${o.last_name}`,
            })),
            onChange: (e) => {
              setFormData((prev) => ({
                ...prev,
                owner: e.target.value,
              }));
            },
          },
        ]}
        onSubmit={handleAdd}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default AccountPage;
