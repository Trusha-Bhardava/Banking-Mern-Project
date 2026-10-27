// Import the useState hook from React to manage the local state of the user.
import { useState } from "react";
// Import Link for page navigation and useNavigate to programmatically redirect users.
import { Link, useNavigate } from "react-router-dom";

/* 
    State: 'user' holds the currently logged-in user data.
    It initializes by fetching the "user" string from localStorage 
    and converting it back into a JavaScript object using JSON.parse().
  */
function Navbar() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Initialize the navigate function to handle page redirects
  const navigate = useNavigate();

  const handleLogout = () => {
    //  Clear session and user data from the browser's localStorage.
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  //  Clear the React state so the UI immediately updates 
  setUser(null);

  alert("Logged out successfully!");

  //  Redirect the user back to the home page ("/") after they log out.
  navigate("/");
};

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          🏦 SecureBank
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Buttons */}
        <div className="navbar-buttons">

          {!user ? (
            <>
              <Link
                to="/login"
                className="login-button"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="open-account-button"
              >
                Open Account
              </Link>
            </>
          ) : (
            // If 'user' exists (Logged in)
            <>
           
              <span className="welcome-user">
                Hi, {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
