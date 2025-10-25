# API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "referralCode": "W2VABC123" // optional
}
```

#### Login User
```http
POST /auth/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Register Agent
```http
POST /auth/agent/register
Content-Type: application/json

{
  "name": "Agent Smith",
  "email": "agent@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "vehicleType": "bike",
  "vehicleNumber": "ABC123",
  "vehicleCapacity": 50
}
```

#### Login Agent
```http
POST /auth/agent/login
Content-Type: application/json

{
  "email": "agent@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

### User Endpoints

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Get User Dashboard
```http
GET /users/dashboard
Authorization: Bearer <token>
```

#### Get Pickup History
```http
GET /users/pickups
Authorization: Bearer <token>
```

#### Get Wallet
```http
GET /users/wallet
Authorization: Bearer <token>
```

#### Get Addresses
```http
GET /users/addresses
Authorization: Bearer <token>
```

#### Add Address
```http
POST /users/addresses
Authorization: Bearer <token>
Content-Type: application/json

{
  "label": "Home",
  "fullAddress": "123 Main St, City",
  "landmark": "Near Park",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "city": "City",
  "state": "State",
  "pincode": "123456"
}
```

### Agent Endpoints

#### Get Agent Profile
```http
GET /agents/profile
Authorization: Bearer <agent_token>
```

#### Update Online Status
```http
PUT /agents/status
Authorization: Bearer <agent_token>
Content-Type: application/json

{
  "isOnline": true
}
```

#### Update Location
```http
PUT /agents/location
Authorization: Bearer <agent_token>
Content-Type: application/json

{
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  }
}
```

#### Get Pickup Requests
```http
GET /agents/requests
Authorization: Bearer <agent_token>
```

#### Accept Pickup Request
```http
POST /agents/requests/:id/accept
Authorization: Bearer <agent_token>
```

### Pickup Endpoints

#### Create Pickup Request
```http
POST /pickups
Authorization: Bearer <token>
Content-Type: application/json

{
  "wasteTypeId": "<uuid>",
  "addressId": "<uuid>",
  "estimatedWeight": 5.5,
  "images": ["url1", "url2"],
  "scheduledFor": "2024-12-01T10:00:00Z", // optional
  "notes": "Please call before arriving"
}
```

#### Get Pickup Details
```http
GET /pickups/:id
```

#### Track Pickup
```http
GET /pickups/:id/track
```

#### Rate Pickup
```http
POST /pickups/:id/rate
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "review": "Great service!",
  "tags": ["punctual", "professional"]
}
```

### Waste Endpoints

#### Get Waste Types
```http
GET /waste/types
```

#### Classify Waste
```http
POST /waste/classify
Content-Type: multipart/form-data

images: [file1, file2, file3]
```

#### Get Pricing
```http
GET /waste/pricing/:wasteTypeId
```

### Payment Endpoints

#### Get Transaction History
```http
GET /payments/transactions/history
Authorization: Bearer <token>
```

#### Request Withdrawal (Agent)
```http
POST /payments/withdraw
Authorization: Bearer <agent_token>
Content-Type: application/json

{
  "amount": 1000,
  "method": "upi",
  "upiId": "agent@upi"
}
```

### Godown Endpoints

#### Get All Godowns
```http
GET /godowns
```

#### Get Nearest Godown
```http
GET /godowns/nearest?lat=<latitude>&lng=<longitude>
```

## Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    // response data
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [] // validation errors if any
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
