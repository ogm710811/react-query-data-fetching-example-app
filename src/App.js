import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

import "./App.css";

export default function App() {
  return (
    <div>
      <Exchange />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

const fetchExchange = async (currency) => {
  const response = await fetch(
    `http://api.ratesapi.io/latest?base=${currency}`
  );
  const data = await response.json();
  return data;
};

function Exchange() {
  const [currency, setCurrency] = useState("USD");
  const { status, data, error } = useQuery(currency, fetchExchange);

  if (status === "loading") return <div>loading ...</div>;
  if (status === "error") return <div>Oop error !!</div>;
  return (
    <div>
      <button
        onClick={() => {
          setCurrency("CAD");
        }}
      >
        CAD
      </button>
      <button
        onClick={() => {
          setCurrency("USD");
        }}
      >
        USD
      </button>
      <button
        onClick={() => {
          setCurrency("EUR");
        }}
      >
        EUR
      </button>

      <h2>Showing Currency {currency}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
