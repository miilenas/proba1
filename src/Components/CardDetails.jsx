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

import { useNavigate } from "react-router-dom";
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const CardDetails = ({ account, token }) => {
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
          setTransactions(response.data.transactions);
        })
        .catch((error) => {
          console.error("Error fetching all transactions:", error);
        });
    }
  }, [account, token]);

  const getDate30DaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    return date.toISOString().split("T")[0];
  };

  const handleShowAll = () => {
    console.log(account);
    navigate("/user/account/transactions", { state: { account } });
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
      <div className="mb-3">
        <button
          className="btn m-2"
          style={{
            backgroundColor: "#36A2EB",
            color: "#fff",
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
                {account.currency.name}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleShowAll}>
            Show All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
