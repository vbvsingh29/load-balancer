const express = require("express");
const app = express();

app.use(express.json());

// graphQl api dummy
app.post("/graphql", (req, res) => {
  res.send({ message: "Response from GraphQL API" });
});

// healthcheck API
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Starting graphql server
app.listen(3002, () => {
  console.log("GraphQL API running on port 3002");
});
