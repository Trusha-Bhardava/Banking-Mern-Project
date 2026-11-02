# SecureBank – Backend

## About

SecureBank Backend is developed using Node.js, Express.js, and MongoDB. It handles the application's server-side operations, including user authentication, account management, banking transactions, contact messages, and AI-powered resume analysis.

The backend provides REST APIs that connect the React frontend with the MongoDB database.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors
- Google Gemini API

## Features

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected Routes
- Change Password
- Bank Account Creation
- Account Details
- Deposit Money
- Withdraw Money
- Money Transfer
- Transaction Management
- Contact Message Management
- AI Resume Analysis

## Project Structure

```text
Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── user.controller.js
│   ├── account.controller.js
│   ├── contact.controller.js
│   └── resume.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── account.model.js
│   ├── contact.model.js
│   └── transaction.model.js
│
├── routes/
│   ├── user.route.js
│   ├── account.route.js
│   ├── contact.route.js
│   └── resume.route.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

*Note: The structure above shows the main backend files. Adjust individual filenames if your current project uses different names.*

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Trusha-Bhardava/Banking-Mern-Project.git
```

### 2. Navigate to Backend Folder

```bash
cd Banking-Mern-Project/Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Replace the example values with your actual credentials.

**Important:** Never upload your `.env` file or API keys to GitHub.

### 5. Start the Backend

If your package.json contains a start script:

```bash
npm start
```

Otherwise, run:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:8000
```

## API Routes

### User APIs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user |
| PUT | `/api/users/change-password` | Change password |
| GET | `/api/users/protected` | Access protected route |

### Account APIs

The account routes handle:

- Creating a bank account
- Getting account details
- Checking account balance
- Depositing money
- Withdrawing money
- Transferring money

### Contact API

The contact API receives and stores contact messages in MongoDB.

### Resume Analyzer API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/resume/analyze` | Analyze resume using Gemini AI |

## Authentication and Security

### Password Hashing

Passwords are hashed using bcryptjs before storing them in MongoDB.

### JWT Authentication

JSON Web Tokens are used to authenticate users.

### Protected Routes

Authentication middleware checks the JWT token before allowing access to protected endpoints.

### Environment Variables

Sensitive information such as database credentials, JWT secrets, and Gemini API keys is stored in environment variables.

## Database

SecureBank uses MongoDB Atlas as its database and Mongoose to interact with MongoDB.

The application stores user information, bank account details, transaction records, and contact messages.

## Frontend Connection

The frontend communicates with this backend through REST API requests.

Local backend URL:

```text
http://localhost:8000
```

## Author

**Trusha Bhardava**

GitHub: https://github.com/Trusha-Bhardava