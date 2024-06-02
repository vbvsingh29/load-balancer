const axios = require("axios");

const endpoints = {
  rest: "http://localhost:3001/rest",
  graphql: "http://localhost:3002/graphql",
  grpc: "http://localhost:3003/grpc",
};

// Simulate slow and fast responses
const simulateResponse = async (url) => {
  const responseTime = Math.random() > 0.5 ? 100 : 2000; // Fast: 100ms, Slow: 2000ms
  await new Promise((resolve) => setTimeout(resolve, responseTime));
  return axios.post(url).then((response) => response.data);
};

const routeRequest = async (req, res) => {
  const { apiType, payload } = req.body;
  console.log(apiType, payload, "TEST");
  let endpoint;
  switch (apiType) {
    case "REST":
      endpoint = endpoints.rest;
      break;
    case "GraphQL":
      endpoint = endpoints.graphql;
      break;
    case "gRPC":
      endpoint = endpoints.grpc;
      break;
    default:
      endpoint = endpoints.rest;
  }

  // additional routing logic (size is more than redirect to GRPC)
  if (payload.size > 1024) {
    endpoint = endpoints.grpc;
  }

  try {
    const result = await simulateResponse(endpoint);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { routeRequest };
