# Authentication API

A RESTful Authentication API built using Node.js and Express.js. This project demonstrates user registration, login, token-based authentication, and protected routes.

## Features

- User registration (Signup)
- User login and authentication
- Token-based authentication using JWT
- Protected API routes
- Request validation and error handling
- REST API testing using Postman

## Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** JSON Web Token (JWT)
- **Password Security:** bcrypt (if implemented)
- **Testing:** Postman
- **Data Storage:** JSON file or database, depending on your implementation

## Project Structure

```text
Authentication-API/
├── server.js
├── package.json
├── package-lock.json
├── data/
├── routes/
├── middleware/
├── controllers/
└── README.md
```

*Note: Update the folder structure to match your actual project.*

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd Authentication-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

If your project uses environment variables, create a `.env` file and configure the required values, such as:

```env
PORT=3000
JWT_SECRET=your_secret_key
```

Use a strong secret for JWT signing and never commit your `.env` file to GitHub.

### 5. Start the server

```bash
npm start
```

If your project does not define a start script, run:

```bash
node server.js
```

The API will be available at `http://localhost:3000` if port 3000 is configured.

## API Endpoints

Update the endpoint paths to match your implementation.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate a user |
| GET | `/protected` | Access a protected route using a valid token |

## Testing with Postman

1. Start the Node.js server.
2. Open Postman.
3. Send a POST request to the signup endpoint with the required user details.
4. Send a POST request to the login endpoint.
5. Copy the JWT token returned by the login response.
6. Send a request to the protected endpoint with the token in the Authorization header.

Example header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Security Notes

- Hash passwords before storing them.
- Never store passwords in plain text.
- Keep JWT secrets outside the source code.
- Validate user input.
- Protect private routes with authentication middleware.
- Use HTTPS when deploying to production.

## Learning Outcomes

- Understanding REST API development
- Implementing signup and login functionality
- Working with JWT authentication
- Creating protected routes and middleware
- Testing APIs using Postman
- Handling errors and validating requests

## Future Improvements

- Add refresh-token support.
- Integrate MongoDB or PostgreSQL.
- Implement role-based access control.
- Add email verification and password reset functionality.

## Author

Created as a backend development mini project to practice Node.js, Express.js, REST APIs, and authentication.

