# SecureBank – Frontend

## About

SecureBank is a MERN Stack Banking Application frontend built using React and Vite. It provides a user-friendly interface for customers to access banking services such as registration, login, deposits, withdrawals, money transfers, and account management.

The frontend communicates with the backend through REST APIs.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- React Router DOM
- Fetch API

## Features

- User Registration
- User Login and Logout
- Home Page
- Services Page
- About Page
- Contact Page
- Deposit Money
- Withdraw Money
- Money Transfer
- Account Details
- Transaction History
- Security and Password Management
- AI Resume Analyzer
- Form Validation
- Password Visibility Toggle

## Project Structure

```text
Fronted/
│
├── public/
│   └── images/
│
├── src/
│   ├── component/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── login.jsx
│   │   │
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Deposit.jsx
│   │   ├── Withdraw.jsx
│   │   ├── Transfer.jsx
│   │   ├── Account.jsx
│   │   ├── Transaction.jsx
│   │   └── Security.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

*Note: The structure above describes the main frontend files. Additional files may exist in the project.*

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Trusha-Bhardava/Banking-Mern-Project.git
```

### 2. Navigate to Frontend Folder

```bash
cd Banking-Mern-Project/Fronted
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Frontend

```bash
npm run dev
```

Vite will display a local URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

## Backend Connection

The frontend communicates with the backend running locally at:

```text
http://localhost:8000
```

The application uses API requests for registration, login, banking operations, contact messages, and resume analysis.

For deployment, configure the frontend API base URL using the Vite environment variable:

```env
VITE_API_URL=your_backend
