// Import the useState hook from React to manage the form input values.
import { useState } from "react";

function Login() {

  //formData initialized as an object with empty strings, setFormData is function to update this object.
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // A function triggered every single time a user presses a key inside an input field.
  const handleChange = (e) => {
    setFormData({
      ...formData, // copies all existing key-value pairs inside the state
      [e.target.name]: e.target.value // update the field what user type
    });
  };


// Handles form submission when the user clicks the Login button and request to the backend API.
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://localhost:8000/api/users/login",
      {
        method: "POST",
        // Ensure backend parses this as JSON payload.
        headers: {
          "Content-Type": "application/json"
        },
        // it converts the JavaScript formData object into a JSON string format so the backend can read it.
        body: JSON.stringify(formData)
      }
    );

    // Parse the JSON payload sent back from the backend server
    const data = await response.json();

    // if it successful then store json token in browser for long term memory
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
            required  // Stops the user from submitting an empty.
          />

        <div className="form-group">
        <label>Password</label>

        <div className="login-password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="login-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>
             <button type="submit" className="login-submit-btn">
              Login
            </button>

        </form>

      </div>

    </div>
  );
}

export default Login;