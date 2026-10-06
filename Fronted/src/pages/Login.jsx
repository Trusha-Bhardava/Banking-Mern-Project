import { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("LOGIN.JSX FILE LOADED");

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("LOGIN HANDLESUBMIT IS RUNNING");

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      // =========================
      // LOGIN FAILED
      // =========================

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // =========================
      // CHECK USER
      // =========================

      if (!data.user) {
        console.log("User information is missing:", data);

        alert("Login failed: user information not received");

        return;
      }

      // =========================
      // STORE USER ID
      // =========================

      localStorage.setItem(
        "userId",
        data.user._id
      );

      // =========================
      // STORE USER INFORMATION
      // =========================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // =========================
      // STORE ROLE
      // =========================

      localStorage.setItem(
        "role",
        data.user.role
      );

      console.log(
        "USER ID SAVED:",
        localStorage.getItem("userId")
      );

      console.log(
        "USER SAVED:",
        localStorage.getItem("user")
      );

      console.log(
        "ROLE SAVED:",
        localStorage.getItem("role")
      );

      // =========================
      // SUCCESS
      // =========================

      alert(data.message || "Login successful");

      // Go to profile after login
      navigate("/profile");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Welcome Back</h1>

        <p>Login to your Job Portal account</p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* ROLE */}

          <label>Login As</label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="student">
              Student
            </option>

            <option value="recruiter">
              Recruiter
            </option>

          </select>

          {/* LOGIN BUTTON */}

          <button type="submit">
            Login
          </button>

        </form>

        <p className="login-register-text">

          Don't have an account?

          <a href="/register">
            {" "}Create Account
          </a>

        </p>

      </div>

    </div>
  );
}

export default Login;