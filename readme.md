# SecureBank – MERN Banking Application

SecureBank is a full-stack online banking application built using the MERN stack. It provides a simple and user-friendly interface for managing banking operations, including user authentication, account management, deposits, withdrawals, money transfers, contact messages, and AI-powered resume analysis.

This project was developed as a learning and portfolio project to demonstrate full-stack web development skills.

## Features

### User Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API routes.
- Change password functionality.
- Registration form validation.

### Banking Services
- Bank account creation and management.
- Account balance viewing.
- Deposit money.
- Withdraw money.
- Transfer money between accounts.
- Account details and transaction-related features.

### AI Resume Analyzer
- Analyze resume text using an AI model.
- Receive feedback and suggestions to improve a resume.
- Help identify skills and areas for improvement.

### Contact
- Submit contact messages through the website.
- Store submitted messages in the database.

### User Interface
- Responsive React frontend.
- Home, Services, About, Contact, Login, and Register pages.
- Customer banking pages.
- Navigation based on login status.

## Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT authentication
- bcryptjs

**Database**
- MongoDB
- Mongoose

**AI Integration**
- Google Gemini API

**Development and Testing**
- Git and GitHub
- Postman
- npm

## Project Structure

```text
Banking-Mern-Project/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── Fronted/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env.production
│
└── README.md
```

*Note: The structure above is a guide based on the current project setup. Your actual folders and files may differ.*

## Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A MongoDB Atlas account or a MongoDB instance
- Postman for API testing
- A Google Gemini API key if using the AI Resume Analyzer

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Trusha-Bhardava/Banking-Mern-Project.git
cd Banking-Mern-Project
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Replace the example values with your own credentials. Do not commit your `.env` file to GitHub.

Start the backend:

```bash
npm start
```

If the project does not have a `start` script in `Backend/package.json`, run:

```bash
node server.js
```

The backend should be available at:

```text
http://localhost:8000
```

### 3. Set up the frontend

Open another terminal from the project root:

```bash
cd Fronted
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

Make sure frontend API requests point to the backend URL and that the backend allows requests from the frontend origin.

## API Overview

The backend provides REST API endpoints for authentication, banking operations, and contact messages.

| Feature | Base endpoint |
|---|---|
| User registration | `POST /api/users/register` |
| User login | `POST /api/users/login` |
| Change password | `PUT /api/users/change-password` |
| Protected user test | `GET /api/users/protected` |
| Account operations | `/api/accounts` |
| Contact messages | `/api/contact` |
| Resume analysis | `/api/resume/analyze` |

The exact account endpoints and required request fields depend on the routes implemented in the project. Protected endpoints may require a JWT in the `Authorization` header.

## Security Notes

- Passwords should be hashed before being stored.
- Protected endpoints should verify JWT tokens.
- Validate user input on both the frontend and backend.
- Keep API keys, database credentials, and JWT secrets private.
- Never commit `.env` files or expose secrets in frontend code.
- This project is for educational and demonstration purposes, not for processing real financial transactions.

## Future Improvements

- Improve transaction history and filtering.
- Add stronger validation and error handling.
- Improve mobile responsiveness and accessibility.
- Deploy the frontend and backend using suitable hosting services.
- Add automated backend and API tests.

## Author

**Trusha Bhardava**

GitHub: [Trusha-Bhardava](https://github.com/Trusha-Bhardava)

## Disclaimer

SecureBank is an educational full-stack development project. It is not an actual bank and should not be used to store real customer financial information or process real-money transactions.