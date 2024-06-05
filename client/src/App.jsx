import React, { useState } from "react";
import "./styles.css";

function App() {
  const [apiType, setApiType] = useState("REST");
  const [payloadSize, setPayloadSize] = useState(100);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null); // Clear previous response
    setError(null); // Clear previous error
    const payload = { size: payloadSize, type: "json" };
    console.log(process.env.REACT_APP_API_ROOT_URL, "ACD");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiType, payload }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(`Request failed: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Load Balancer Test Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="apiType">API Type:</label>
          <select
            id="apiType"
            value={apiType}
            onChange={(e) => setApiType(e.target.value)}
          >
            <option value="REST">REST</option>
            <option value="GraphQL">GraphQL</option>
            <option value="gRPC">gRPC</option>
          </select>
        </div>
        <div>
          <label htmlFor="payloadSize">Payload Size:</label>
          <input
            type="number"
            id="payloadSize"
            value={payloadSize}
            onChange={(e) => setPayloadSize(e.target.value)}
          />
        </div>
        <button type="submit">Send Request</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="error">
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
