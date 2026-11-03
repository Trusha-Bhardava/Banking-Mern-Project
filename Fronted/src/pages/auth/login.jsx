// Import the useState hook from React to manage the form input values.
import { useState } from "react";

function Login() {
 

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // state whenever a user types into an input field.
  const handleChange = (e) => {
    setFormData({
      ...formData, // preserves the other unchanged form values.
      [e.target.name]: e.target.value // preserves the other unchanged form values.
    });
  };

  // Handles form submission when the user clicks the Login button.Handles form submission when the user clicks the Login button.request to the backend API.
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:8000/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (response.ok) {

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user ID
      localStorage.setItem("userId", data.user.id);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log("LOGIN SUCCESSFUL:", data);

      alert("Login successful!");

      // Redirect to home page
      window.location.href = "/";

    } else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    alert("Unable to connect to server");
  }
};

  return (
    <div className="login-page">

      <div className="login-container">

        <h1>Welcome Back</h1>

        <p>Login to your SecureBank account.</p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="login-submit-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;