import { useState } from "react";

function Login() {
 

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("AUTH LOGIN FILE IS RUNNING");
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

  console.log("LOGIN RESPONSE:", data);
  console.log("TOKEN SAVED:", localStorage.getItem("token"));
  console.log("USER ID SAVED:", localStorage.getItem("userId"));

     alert("Login successful!");

      window.location.href = "/";
     } 
     else 
     {
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