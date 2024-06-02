const express = require("express");
const { routeRequest } = require("./routes/mockApis.js");
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//HealthCheck API for ALL server
app.get("/healthCheck", async (req, res) => {
  const services = [
    { name: "REST API", url: "http://localhost:3001/health" },
    { name: "GraphQL API", url: "http://localhost:3002/health" },
    { name: "gRPC API", url: "http://localhost:3003/health" },
  ];

  const healthStatuses = await Promise.all(
    services.map(async (service) => {
      try {
        const response = await axios.get(service.url);
        return {
          name: service.name,
          status: response.data.status,
          message: "Healthy",
        };
      } catch (error) {
        return {
          name: service.name,
          status: "unhealthy",
          message: error.message,
        };
      }
    })
  );
  res.json({ services: healthStatuses });
});

// Dynamic Routing API
app.post("/route", (req, res) => {
  routeRequest(req, res);
});

// Starting Server
app.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
});
