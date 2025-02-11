import React, { useEffect, useState } from "react";
import Card from "../Components/Card";

const CurrencyPage = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/currency")
      .then((response) => response.json())
      .then((data) => setCurrencies(data.currencies))
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available currencies</h2>
      <div className="row">
        {currencies.length > 0 ? (
          currencies.map((currency) => (
            <Card
              key={currency.id}
              title={currency.name}
              data={currency}
              dataText={{
                Date: currency.date,
                "Exchange rate": currency.exchange_rate,
              }}
            />
          ))
        ) : (
          <p>No currencies available</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyPage;
