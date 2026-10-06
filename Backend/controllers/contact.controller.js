import Contact from "../models/contact.model.js";

export const sendMessage = async (req, res) => {
  try {

    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Create contact message
    const contact = new Contact({
      name,
      email,
      message
    });

    // Save message
    await contact.save();

    res.status(201).json({
      message: "Message sent successfully"
    });

  } catch (error) {

    console.log("Contact message error:", error);

    res.status(500).json({
      message: "Unable to send message",
      error: error.message
    });

  }
};