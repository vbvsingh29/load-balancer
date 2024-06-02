const express = require("express");
const app = express();

app.use(express.json());

// dummy endpooint sending REST response
app.post("/rest", (req, res) => {
  res.send({ message: "Response from REST API" });
});

//healthCheck API
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// REST APi Server
app.listen(3001, () => {
  console.log("REST API running on port 3001");
});
