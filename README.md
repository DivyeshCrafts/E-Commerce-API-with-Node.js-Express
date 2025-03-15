# E-Commerce API with Node.js & Express

## Overview
This project is a backend service for an e-commerce application, built using **Node.js** and **Express.js**. It provides RESTful APIs to manage products, users, orders, and authentication.

## Features
- User authentication (JWT-based)
- Product management (CRUD operations)
- Order processing
- Secure environment configuration
- MongoDB integration

## Technologies Used
- **Node.js** & **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **dotenv** - Environment variable management

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/e_commerce.git
   cd e_commerce
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Rename `.env.sample` to `.env`
   - Update required variables (MongoDB URI, JWT secret, etc.)

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | /api/products       | Get all products    |
| POST   | /api/products       | Add a new product   |
| GET    | /api/orders         | Get all orders      |
| POST   | /api/auth/register  | Register a new user |
| POST   | /api/auth/login     | User login          |

## Contributing
Feel free to submit issues and pull requests to improve the project.

## License
This project is licensed under the MIT License.

