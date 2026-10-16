import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Extracts the Authorization header from the incoming request.
    // This contains the JWT token sent by the frontend to access protected routes.
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token is required"
      });
    }
    //  Splits the string at the space and takes the second element ([1]).
    // This removes the "Bearer" prefix and extracts only the pure JWT token string.
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach the decoded user payload to the 'req' object so downstream controllers can access it,
    // then call next() to pass control to the next middleware or controller function.
    req.user = decoded;
    next();

  } catch (error) {
    console.log("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};