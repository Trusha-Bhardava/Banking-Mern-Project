import { useState } from "react";
import "./Security.css";

function Security() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 'loading' tracks active network calls to the change-password API.
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (newPassword !== confirmPassword) {

      alert("New password and confirm password do not match");

      return;

    }


    if (newPassword.length < 6) {

      alert("New password must be at least 6 characters");

      return;

    }


    try {

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

// Terminate operations if session tokens are absent.
      if (!token || !userId)
     {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/users/change-password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            userId,
            currentPassword,
            newPassword
          })
        }
      );


      const data = await response.json();


      console.log(
        "CHANGE PASSWORD RESPONSE:",
        data
      );

// Check if the server validated the inputs successfully.
      if (!response.ok) 
        {
        alert(
          data.message ||
          "Unable to change password"
        );
        return;
      }


      alert("Password changed successfully");


      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");


    } catch (error) {

      console.log(
        "Change password error:",
        error
      );

      alert(
        "Unable to connect to server"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="security-page">

      <div className="security-container">


        <div className="security-header">

          <p>SECUREBANK</p>

          <h1>Account Security</h1>

          <span>
            Keep your account safe and secure.
          </span>

        </div>


        <div className="security-card">


          <div className="security-title">

            <div className="security-icon">
              🔒
            </div>

            <div>

              <h2>Change Password</h2>

              <p>
                Update your password regularly
                to keep your account secure.
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>


            <label>
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              required
            />


            <label>
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
            />


            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />


            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Changing Password..."
                : "Change Password"
              }
            </button>


          </form>

        </div>


        <div className="security-info">

          <span>🛡️</span>

          <div>

            <h3>Your account is protected</h3>

            <p>
              Never share your password or banking
              information with anyone.
            </p>

          </div>

        </div>


      </div>

    </div>

  );
}

export default Security;