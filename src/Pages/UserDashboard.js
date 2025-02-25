import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard";
import CardDetails from "../Components/CardDetails";

const UserDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/user/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const fetchedAccounts = response.data.accounts;
          setAccounts(fetchedAccounts);

          if (fetchedAccounts.length > 0) {
            setUser(fetchedAccounts[0].owner);
            setSelectedAccount(fetchedAccounts[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setError(error.response.data.message);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
        });
    }
  }, [token]);

  const handleCardClick = (account) => {
    setSelectedAccount(account);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>
        Welcome, {user.first_name} {user.last_name}!
      </h1>
      <div className="d-flex flex-wrap gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => handleCardClick(account)}
            style={{ cursor: "pointer" }}
          >
            <UserCard
              key={account.id}
              accountNumber={account.account_number}
              balance={parseFloat(account.balance)}
              currency={account.currency.name}
              firstName={account.owner.first_name}
              lastName={account.owner.last_name}
              isSelected={selectedAccount && selectedAccount.id === account.id}
            />
          </div>
        ))}
        <div>
          <h4>
            Balance
          </h4>
        </div>
      </div>
      {selectedAccount && (
        <CardDetails account={selectedAccount} accounts={accounts} token={token} />
      )}
    </div>
  );
};

export default UserDashboard;
