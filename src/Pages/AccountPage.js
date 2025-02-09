import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../Components/CategoryCard";
import Modal from "../Components/Modal";

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [owners, setOwners] = useState([]);
const [currencies, setCurrencies] = useState(["USD", "EUR", "RSD"]); 
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    account_number: "",
    balance: "",
    type: "",
  });

  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setOwners(response.data.users); // Pretpostavljam da vraća listu korisnika
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

  const handleOpenEditModal = (account) => {
    setSelectedAccount({ ...account });
    setShowModalEdit(true);
  };

  const handleEdit = (formData) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/admin/account/${selectedAccount.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setAccounts((prevAccounts) =>
          prevAccounts.map((acc) =>
            acc.id === selectedAccount.id ? response.data.account : acc
          )
        );
        setShowModalEdit(false);
        setSelectedAccount(null);
      })
      .catch((error) => {
        console.error("Error editing account:", error);
      });
  };

 const handleAdd = (formData) => {
  // Debugging: Proverite formData pre slanja
  console.log("Form data being sent:", formData);

  // Kreirajte objekat formData sa svim potrebnim podacima
  const dataToSend = {
    account_number: formData.account_number,
    balance: formData.balance,
    type: formData.type,
    currency: formData.currency, // Ovo sada treba da bude ceo objekat
    owner: formData.owner, // Ovo treba da bude ceo objekat
  };

  axios
    .post("http://127.0.0.1:8000/api/admin/account", dataToSend, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setAccounts((prevAccounts) => [...prevAccounts, response.data]);
      setShowModalAdd(false);
    })
    .catch((error) => {
      console.error("Error adding account:", error);
    });
};


  return (
    <div className="container mt-5">
      <h2>Accounts</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card add-category-card"
            onClick={() => {
              setFormData({ account_number: "", balance: "", type: "" });
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

        {accounts.length > 0 ? (
          accounts.map((account) => (
            <CategoryCard
              key={account.id}
              category={{
                id: account.id,
                type: account.type,
                description: `Owner: ${account.owner.first_name} ${account.owner.last_name} | Balance: ${account.balance} ${account.currency.name}`,
              }}
              onDelete={() => handleDelete(account.id)}
              onEdit={() => handleOpenEditModal(account)}
            />
          ))
        ) : (
          <p>No accounts available.</p>
        )}
      </div>
          

<Modal
  show={showModalAdd}
  onClose={() => setShowModalAdd(false)}
  fields={[
    { name: "account_number", label: "Account Number", type: "text", required: true },
    { name: "balance", label: "Balance", type: "number", required: true },
    {
      name: "currency",
      label: "Currency",
      type: "checkbox", 
      options: [
        { value: "RSD", label: "RSD" },
        { value: "EUR", label: "EUR" },
        { value: "USD", label: "USD" },
      ],
      onChange: (e) => {
        setFormData((prev) => ({
          ...prev,
          currency: e.target.value,
          type: e.target.value === "RSD" ? "RSD Account" : "Foreign Exchange",
        }));
      },
    },
    {
      name: "owner",
      label: "Owner",
      type: "checkbox", // Promenili smo na radio dugmadi
      options: owners.map((o) => ({ value: o.id, label: `${o.first_name} ${o.last_name}` })),
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

<Modal
  show={showModalEdit}
  onClose={() => setShowModalEdit(false)}
  fields={[
    { name: "account_number", label: "Account Number", type: "text", required: true },
    { name: "balance", label: "Balance", type: "number", required: true },
    {
      name: "currency",
      label: "Currency",
      type: "checkbox", 
      options: currencies.map((c) => ({ value: c, label: c })),
      onChange: (e) => {
        setSelectedAccount((prev) => ({
          ...prev,
          currency: e.target.value,
          type: e.target.value === "RSD" ? "RSD Account" : "Foreign Exchange",
        }));
      },
    },
    {
      name: "owner",
      label: "Owner",
      type: "checkbox", 
      options: owners.map((o) => ({ value: o.id, label: `${o.first_name} ${o.last_name}` })),
      onChange: (e) => {
        setSelectedAccount((prev) => ({
          ...prev,
          owner: e.target.value,
        }));
      },
    },
  ]}
  onSubmit={handleEdit}
  formData={selectedAccount}
  setFormData={setSelectedAccount}
/>


    </div>
  );
};

export default AccountPage;
