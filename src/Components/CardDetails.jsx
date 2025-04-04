import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Modal from "../Components/Modal";
import { useNavigate } from "react-router-dom";
import "../CSS/ModalBackground.css";
import AlertModal from "./AlertModal";
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const CardDetails = ({ account, accounts, token, fetchAccounts }) => {
  const otherAccounts =
    accounts && account ? accounts.filter((acc) => acc.id !== account.id) : [];
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModalInternal, setshowModalInternal] = useState(false);
  const [showModalExternal, setshowModalExternal] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    receiver_account_number: "",
    amount: "",
    description: "",
    category_id: "",
  });
  const [messages, setMessages] = useState(null);
  const [title, setTitle] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (!account || !token) return;

    if (account && token) {
      axios
        .get(
          `http://127.0.0.1:8000/api/user/accounts/${account.id}/transactions/search`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              funds: "incoming",
              date_from: getDate30DaysAgo(),
            },
          }
        )
        .then((response) => {
          const incomeTransactions = response.data.transactions;
          const totalIncome = incomeTransactions.reduce(
            (sum, transaction) => sum + parseFloat(transaction.amount),
            0
          );
          setIncome(totalIncome);

          axios
            .get(
              `http://127.0.0.1:8000/api/user/accounts/${account.id}/transactions/search`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                params: {
                  funds: "outgoing",
                  date_from: getDate30DaysAgo(),
                },
              }
            )
            .then((outgoingResponse) => {
              console.log(outgoingResponse);
              const outgoingTransactions = outgoingResponse.data.transactions;
              const totalOutgoing = outgoingTransactions.reduce(
                (sum, transaction) => sum + parseFloat(transaction.amount),
                0
              );
              setOutgoing(totalOutgoing);
            })
            .catch((error) => {
              console.error("Error fetching outgoing transactions:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching income transactions:", error);
        });

      axios
        .get(
          `http://127.0.0.1:8000/api/user/accounts/${account.id}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTransactions([...response.data.transactions].reverse());
        })
        .catch((error) => {
          console.error("Error fetching all transactions:", error);
        });
    }
  }, [account, token]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCategory(response.data["transaction categories"]);
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        });
    }
  }, [token]);

  const getDate30DaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    return date.toISOString().split("T")[0];
  };

  const handleShowAll = () => {
    navigate("/user/account/transactions", { state: { account } });
  };

  const handleTransaction = (formData) => {
    const receiver_acc_num =
      formData.receiver_account_number || otherAccounts[0]?.account_number;
    const amount = parseFloat(formData.amount);
    const category_id = formData.category_id || category[0]?.id;
    const dataToSend = {
      receiver_account_number: receiver_acc_num,
      amount: amount,
      description: formData.description,
      category_id: category_id,
    };

    console.log(dataToSend);

    axios
      .post(
        `http://127.0.0.1:8000/api/user/accounts/${account.id}/transfer`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setTransactions((prevTransactions) => [
          response.data.transaction,
          ...prevTransactions,
        ]);
        console.log(response);
        fetchAccounts();
        setshowModalInternal(false);
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

  const pieData = {
    labels: ["Income", "Outgoing"],
    datasets: [
      {
        data: [income, outgoing],
        backgroundColor: ["#36A2EB", "#A0C878"],
        hoverBackgroundColor: ["#36A2EB", "#A0C878"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    height: 150,
    width: 150,
  };

  return (
    <div className="container mt-4">
      {showModalInternal && <div className="modal-backdrop" />}
      {showModalExternal && <div className="modal-backdrop" />}
      <div className="mb-3">
        <button
          className="btn m-2"
          style={{
            backgroundColor: "#36A2EB",
            color: "#fff",
          }}
          onClick={() => {
            setFormData({
              receiver_account_number: "",
              amount: "",
              description: "",
              category_id: "",
            });
            setshowModalExternal(true);
          }}
        >
          New Payment
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#A0C878",
            color: "#fff",
          }}
          onClick={() => {
            setFormData({
              receiver_account_number: "",
              amount: "",
              description: "",
              category_id: "",
            });
            setshowModalInternal(true);
          }}
        >
          Internal Transfer
        </button>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h4>Last month report</h4>
          <p>
            <strong>Income:</strong> {income} {account.currency.name}
          </p>
          <p>
            <strong>Outgoing:</strong> {outgoing} {account.currency.name}
          </p>
        </div>

        <div
          className="col-md-4"
          style={{ position: "relative", height: "150px" }}
        >
          <h4 className="text-center">Income vs Outgoing</h4>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="col-md-5">
          <h4>Last 5 Transactions</h4>
          <ul className="list-group">
            {transactions.slice(0, 5).map((transaction) => (
              <li key={transaction.id} className="list-group-item">
                {transaction.description} : {transaction.amount}{" "}
                {transaction.sender_account.currency.name}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleShowAll}>
            Show All
          </button>
        </div>
      </div>

      <Modal
        modalTitle="New Payment"
        acceptButton="Finish"
        show={showModalExternal}
        onClose={() => setshowModalExternal(false)}
        fields={[
          {
            name: "receiver_account_number",
            label: "Receiver account number:",
            type: "text",
            required: true,
          },
          {
            name: "amount",
            label: "Amount:",
            type: "numeric",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category:",
            type: "select",
            options: [
              { value: "", label: "Select transaction category" },
              ...(Array.isArray(category)
                ? category.map((c) => ({
                    value: c.id,
                    label: `${c.type}`,
                  }))
                : []),
            ],
            required: true,
          },
        ]}
        onSubmit={handleTransaction}
        formData={formData}
        setFormData={setFormData}
      />

      <Modal
        modalTitle="Internal transfer"
        acceptButton="Finish"
        show={showModalInternal}
        onClose={() => setshowModalInternal(false)}
        fields={[
          {
            name: "receiver_account_number",
            label: "Receiver account number:",
            type: "select",
            options: [
              { value: "", label: "Select receiver account" },
              ...(Array.isArray(otherAccounts)
                ? otherAccounts.map((acc) => ({
                    value: acc.account_number,
                    label: `${acc.account_number}`,
                  }))
                : []),
            ],
            required: true,
          },
          {
            name: "amount",
            label: "Amount:",
            type: "numeric",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category:",
            type: "select",
            options: [
              { value: "", label: "Select transaction category" },
              ...(Array.isArray(category)
                ? category.map((c) => ({
                    value: c.id,
                    label: `${c.type}`,
                  }))
                : []),
            ],
            required: true,
          },
        ]}
        onSubmit={handleTransaction}
        formData={formData}
        setFormData={setFormData}
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

export default CardDetails;
