import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const token = sessionStorage.getItem("access_token");
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const { account } = location.state || {};
  useEffect(() => {
    if (account && token) {
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
          console.log(transactions);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, [account, token]);

  const handleDownloadPDF = (transactionId) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/user/transactions/${transactionId}/print`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", 
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `transaction_${transactionId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>All Transactions</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Category</th>
            <th
              onClick = {() => setTransactions((prevTransactions) => [...prevTransactions].reverse())}>
              Date
            </th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
            <th>Scope</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{`${transaction.sender.first_name} ${transaction.sender.last_name}`}</td>
              <td>{transaction.receiver_account_number}</td>
              <td>{transaction.category.type}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.status}</td>
              <td>{transaction.scope}</td>
              <td>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "transparent",
                    color: "#000000",
                  }}
                  onClick={() => handleDownloadPDF(transaction.id)}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;
