import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/contact/send",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );


      const data = await response.json();


      console.log(
        "CONTACT RESPONSE:",
        data
      );


      if (!response.ok) {

        alert(
          data.message ||
          "Unable to send message"
        );

        return;
      }


      alert("Message sent successfully!");


      // Clear form
      setFormData({
        name: "",
        email: "",
        message: ""
      });


    } catch (error) {

      console.log(
        "Contact error:",
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

    <div className="contact-page">

      <h1>Contact Us</h1>

      <p className="contact-intro">
        Have a question? We are here to help you.
      </p>


      <div className="contact-container">


        {/* Contact Information */}

        <div className="contact-info">

          <h2>Get in Touch</h2>

          <p>
            <strong>Address:</strong>
            {" "}Rajkot, Gujarat, India
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}+91 98765 43210
          </p>

          <p>
            <strong>Email:</strong>
            {" "}support@securebank.com
          </p>

          <p>
            <strong>Working Hours:</strong>
            {" "}Monday - Saturday
          </p>

        </div>


        {/* Contact Form */}

        <div className="contact-form">

          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>


            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />


            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />


            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>


            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Sending..."
                : "Send Message"
              }

            </button>


          </form>

        </div>

      </div>

    </div>

  );

}

export default Contact;