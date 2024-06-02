# Load Balancer

A load balancer that manages and distributes traffic across multiple unique APIs. The load balancer is capable of dynamic routing based on various criteria.

## Overviews

This project is divided into two main components:

1. Backend: Implements the load balancer logic, dynamic routing, health check endpoints, and API handling.
2. Client: Provides a user interface to test the load balancer functionality.

## How to run
#### Backend
For backend from Root Direcroty
`yarn`
`yarn run dev`

#### Client
`cd client`
`yarn start`

# APIEndpoints

1. `http://localhost:3000/healthCheck ` // For healthcheck of all server

2. `https://localhost:3000/route` // For dynamic routing based on payload
