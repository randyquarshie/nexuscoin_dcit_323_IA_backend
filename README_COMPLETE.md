# NexusCoin Backend API

A robust Node.js backend API for the NexusCoin cryptocurrency platform with JWT authentication and MongoDB database integration.

## Features

✅ **JWT-Based Authentication**
- User registration with email validation
- Secure login with password hashing (bcryptjs)
- Protected routes for authenticated users
- HTTP-only cookie support

✅ **User Management**
- User profile endpoints
- Secure password storage
- User dashboard/profile access

✅ **Cryptocurrency Data Management**
- Get all cryptocurrencies
- Filter top gainers
- Get new listings
- Add new cryptocurrencies
- Update and delete crypto data

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Security**: CORS, cookie-parser, dotenv

## Installation

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or MongoDB Atlas)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd DCIT-323-IA
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables**
```bash
cp .env.example .env
```

4. **Configure .env file**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nexuscoin
JWT_SECRET=your_secure_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

5. **Start the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-05-04T10:30:00Z"
  }
}
```

#### Logout
```
POST /api/auth/logout
Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Cryptocurrency Routes (`/api/crypto`)

#### Get All Cryptocurrencies
```
GET /api/crypto

Response:
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "crypto_id",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 45000,
      "image": "https://...",
      "change24h": 2.5,
      "createdAt": "2024-05-04T10:30:00Z"
    },
    ...
  ]
}
```

#### Get Top Gainers
```
GET /api/crypto/gainers

Response:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### Get New Listings
```
GET /api/crypto/new

Response:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### Add New Cryptocurrency
```
POST /api/crypto
Content-Type: application/json

{
  "name": "Ethereum",
  "symbol": "ETH",
  "price": 2500,
  "image": "https://...",
  "change24h": 1.5
}

Response:
{
  "success": true,
  "message": "Cryptocurrency added successfully",
  "data": {
    "_id": "crypto_id",
    "name": "Ethereum",
    "symbol": "ETH",
    "price": 2500,
    "image": "https://...",
    "change24h": 1.5
  }
}
```

#### Get Single Cryptocurrency
```
GET /api/crypto/:id

Response:
{
  "success": true,
  "data": { ... }
}
```

#### Update Cryptocurrency
```
PUT /api/crypto/:id
Content-Type: application/json

{
  "price": 2600,
  "change24h": 2.0
}

Response:
{
  "success": true,
  "message": "Cryptocurrency updated successfully",
  "data": { ... }
}
```

#### Delete Cryptocurrency
```
DELETE /api/crypto/:id

Response:
{
  "success": true,
  "message": "Cryptocurrency deleted successfully",
  "data": { ... }
}
```

## Database Schemas

### User Schema
```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Crypto Schema
```javascript
{
  name: String (required, unique),
  symbol: String (required, unique, uppercase),
  price: Number (required, min 0),
  image: String (required),
  change24h: Number (default 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict (e.g., duplicate email)
- 500: Server Error

## Deployment

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. **Create a new Web Service**
   - Connect your GitHub repository
   - Set Build Command: `npm install`
   - Set Start Command: `npm start`
   - Add environment variables

4. **Configure Environment Variables in Render**
   - PORT: 5000
   - NODE_ENV: production
   - MONGODB_URI: (your MongoDB Atlas connection string)
   - JWT_SECRET: (strong random string)
   - FRONTEND_URL: (your deployed frontend URL)

### MongoDB Atlas Setup

1. Create account at [mongodb.com](https://mongodb.com)
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## Security Best Practices

✅ Use environment variables for sensitive data
✅ Hash passwords with bcryptjs (10 rounds)
✅ Implement JWT token expiration (7 days)
✅ Use HTTP-only cookies for token storage
✅ Enable CORS only for trusted origins
✅ Validate all input data
✅ Use unique constraints on database fields

## Testing

Test the API using:
- **Postman**: Import endpoints and test manually
- **curl**: Command-line testing
- **Thunder Client**: VS Code extension

Example curl request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Support & Troubleshooting

- **Port already in use**: Change PORT in .env
- **MongoDB connection error**: Verify MONGODB_URI and network access
- **CORS errors**: Check FRONTEND_URL in .env
- **Token errors**: Verify JWT_SECRET matches between requests

## License

ISC

## Author

Created for DCIT-323 Interim Assessment
