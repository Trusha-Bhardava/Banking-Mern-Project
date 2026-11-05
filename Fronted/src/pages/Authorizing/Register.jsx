
import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({fullName: "", email: "", phone: "", password: ""});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  //  A function triggered every single time a user presses a key inside an input field.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error for the field being edited
    setErrors({
      ...errors,
      [name]: ""
    });

    setMessage("");
  };

  // Validate all form fields
  const validateForm = () => {
    let newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email, e.g. dev@gmail.com";
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    }

    // Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password needs 8 characters, uppercase, lowercase, number and special character (@, #, etc.)";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            email: formData.email.trim()
          })
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok) {
        setMessage("Registration successful!");
        setErrors({});

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: ""
        });
      } else {
        // Show errors returned by backend
        if (data.errors) {
          setErrors(data.errors);
        }

        setMessage(data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-header">
          <h1>Create Your Account</h1>

          <p>
            Join SecureBank and manage your banking easily.
          </p>
        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {errors.fullName && (
              <p className="error">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter your 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />

            {errors.phone && (
              <p className="error">{errors.phone}</p>
            )}
          </div>

          
          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-input-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>


          <button
            type="submit"
            className="register-submit-button"
          >
            Create Account
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Register;
