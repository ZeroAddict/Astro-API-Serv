# MOTIVATION
This project seeks to build the backend framework for users of an astronomy-based website
In the hope of working with a fullstack project. 
The profile, sign up and log in functionality is handled, along with..
Routes, and Controllers.
A database is set up to manage the details that arise from simple CRUD operations.
Mongo schemas, tutorials and API data will be implemented

## Project: Astronomy Website - Backend (Node.js) WebProfile

This document describes the backend functionalities for user management in an astronomy website. It utilizes Node.js and Express framework to handle user signup, login, profile updates, and purchase history.

## Dependencies:

Mongoose: Object Document Mapper (ODM) for interacting with a MongoDB database.
JWT (jsonwebtoken): JSON Web Token library for creating and verifying secure tokens.
Bcrypt: Password hashing library for secure user authentication. 

Models:

User: Represents a user on the astronomy website. It includes fields like username, email, password (hashed), and purchase history.
API Endpoints:

Signup:

This endpoint allows users to register for an account. It takes a username, email, and password in the request body.
The system validates for duplicate usernames and emails before creating a new user in the database.
Upon successful signup, the user object and a JWT token are sent back in the response.
Login:

This endpoint allows users to log in with their credentials (username or email and password).
The system verifies the provided credentials against the stored user information.
If the credentials match, a JWT token is generated and sent back in the response along with the user object.
Find User by ID: (Protected)

This endpoint retrieves a specific user based on their ID.
It requires a valid JWT token in the request header for authorization.
The retrieved user object is returned in the response (excluding password details).
Update Profile: (Protected)

This endpoint allows users to update their profile information.
It requires a valid JWT token in the request header for authorization.
The request body should contain the updated user information.
The updated user object is returned in the response (excluding password details).
Purchase History: (Protected)

This endpoint retrieves a user's purchase history.
It requires a valid JWT token in the request header for authorization.
The system retrieves orders associated with the user and returns them in the response.
Add Order to User History: (Protected)

This endpoint (likely used internally) adds a new order to a user's purchase history.
It requires a valid JWT token in the request header for authorization.
The request body should contain the order details.
Security:

User passwords are stored as hashed values using a secure hashing algorithm like Bcrypt.
JWT tokens are used for user authentication and authorization. These tokens have an expiration time to prevent unauthorized access.

### 1. server.js:

 is the main entry point for the Node.js server application. It sets up the core functionalities and integrates different components.

## Libraries:

express: Web framework for building the server.
bcrypt: Password hashing for secure user authentication.
helmet: Security middleware to protect against common web vulnerabilities.
morgan: HTTP request logger for debugging and monitoring.
cors: Enables Cross-Origin Resource Sharing (CORS) for requests from different origins.
mongoose: Object Document Mapper (ODM) for interacting with a MongoDB database.
jsonwebtoken: JSON Web Token (JWT) library for creating and verifying tokens for authentication.
dotenv: For loading environment variables (not shown in the provided code).
stripe: Stripe integration for payment processing (partially shown).
ejs: Templating engine for rendering dynamic web pages (partially shown).
fs: File system module for file operations (partially shown).
Configuration:

Imports database connection details from a separate config.js file (not provided).
Loads environment variables using dotenv (assumed to be done elsewhere).
Stripe secret and public keys are loaded from environment variables for payment processing.
EJS templating engine is configured for rendering dynamic web pages.
Database Connection:

Mongoose is used to connect to a MongoDB database using the provided connection URI.
Success and error messages are logged upon connection attempts.
Middleware:

cors(): Enables CORS for cross-origin requests.
morgan('dev'): Logs HTTP requests for debugging purposes.
express.urlencoded({ extended: true }): Parses incoming request bodies with URL-encoded data (explained in detail in previous interaction).
./services/passport (not provided): Likely contains passport.js configuration for authentication (explained later in userRoute.js).
API Routes:

app.request("/api/v1", api): Mounts the /api/v1 path to handle API requests defined in a separate routes.js file (not provided).
Authentication Middleware:

isAuthenticated (from middlewares/miware.js): Likely checks for a valid JWT token in the request header for authorization (implementation not provided).
Root Route (/):

A simple route handler for the root path (/) that returns a JSON response (empty in this example).
Payment Processing (Partially Shown):

Stripe is set up for payment processing using the loaded secret key.
Routes for handling order display (/order) and payment processing (/payment) are defined.
The /order route reads an items.json file containing product information and renders an order.ejs template with Stripe public key and product data.
The logic for /payment route (reading items.json and interacting with Stripe's API) has not been fully completed.
 2. 
3. userRoute.js:

This file defines routes related to user management.

### Dependencies:

Imports required modules like express, express-jwt, User model, jwt, and configuration (config.js).
Middleware:

requireSignin: Middleware using express-jwt to check for a valid JWT token before accessing certain routes (defined in auth.js).
Controllers:

Imports controller functions from ../controllers/auth for signup, login, and logout functionalities.
Routes:

/signup: POST request for user signup. Uses signUpVal middleware for validation before calling the signup controller function.
/login: POST request for user login. Calls the login controller function.
/logout: GET request for user logout. Calls the logout controller function.
4. controllers/auth.js (Not Provided):

This file likely contains controller functions for user signup, login, logout, and authorization checks.

signup: Creates a new user in the database.
login: Validates user credentials and generates a JWT token upon successful login.
logout: Clears the user's JWT token (likely by clearing cookies).
requireSignin: Middleware function using express-jwt to check for a valid