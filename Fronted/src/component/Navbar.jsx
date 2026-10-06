import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  setUser(null);

  alert("Logged out successfully!");

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
