const express = require("express");
const app = express();

app.use(express.json());

// dummy API sending response in gRPC
app.post("/grpc", (req, res) => {
  res.send({ message: "Response from gRPC API" });
});

// Health check API
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// starting grpc server
app.listen(3003, () => {
  console.log("gRPC API running on port 3003");
});
