import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const TransactionPage = () => {
  const token = sessionStorage.getItem("access_token");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    scope: "",
    category: "",
    receiver_account_number: "",
    minAmount: "",
    maxAmount: "",
    dateFrom: "",
    dateTo: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const location = useLocation();
  const { account } = location.state || {};
  useEffect(() => {
    if (account && token) {
      fetchTransactions();
      fetchCategories();
      console.log(transactions);
    }
  }, [account, token]);

  const fetchTransactions = () => {
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
        console.log("trans", response);
        setTransactions([...response.data.transactions].reverse());
        setFilteredTransactions([...response.data.transactions].reverse());
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  const fetchCategories = () => {
    axios
      .get(`http://127.0.0.1:8000/api/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data["transaction categories"]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.scope) params.append("funds", filters.scope);
    if (filters.receiver_account_number)
      params.append("receiver_account", filters.receiver_account_number);
    if (filters.minAmount) params.append("amount_min", filters.minAmount);
    if (filters.maxAmount) params.append("amount_max", filters.maxAmount);
    if (filters.dateFrom) params.append("date_from", filters.dateFrom);
    if (filters.dateTo) params.append("date_to", filters.dateTo);
    if (filters.status) params.append("status", filters.status);

    const selectedCategory = categories.find(
      (cat) => cat.type === filters.category
    );
    if (selectedCategory) params.append("category_id", selectedCategory.id);

    axios
      .get(
        `http://127.0.0.1:8000/api/user/accounts/${
          account.id
        }/transactions/search?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFilteredTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
  };

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mt-4">
      <h1>All Transactions</h1>
      <div className="mb-4 p-3 border rounded">
        <div className="row">
          <div className="col">
            <select
              name="scope"
              className="form-control"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
          </div>
          <div className="col">
            <select
              name="category"
              className="form-control"
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.type}>
                  {cat.type}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              name="receiver_account_number"
              placeholder="Receiver Account"
              className="form-control"
              onChange={handleFilterChange}
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="minAmount"
              placeholder="Min Amount"
              className="form-control"
              onChange={handleFilterChange}
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="maxAmount"
              placeholder="Max Amount"
              className="form-control"
              onChange={handleFilterChange}
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="dateFrom"
              className="form-control"
              onChange={handleFilterChange}
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="dateTo"
              className="form-control"
              onChange={handleFilterChange}
            />
          </div>
          <div className="col">
            <select
              name="status"
              className="form-control"
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="successful">Successful</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={applyFilters}>
              Filter
            </button>
          </div>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Category</th>
            <th
              onClick={() =>
                setTransactions((prevTransactions) =>
                  [...prevTransactions].reverse()
                )
              }
            >
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
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{`${transaction.sender.first_name} ${transaction.sender.last_name}`}</td>
              <td>{transaction.receiver_account_number}</td>
              <td>{transaction.category.type}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}{" "}{transaction.sender_account.currency.name}</td>
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
    </div>
  );
};

export default TransactionPage;
