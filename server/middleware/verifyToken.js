import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token)
    // Check if token exists
    return res.status(401).json("Authentication failed! - no token provided");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      // Check if token is valid
      return res.status(401).json("Authentication failed - invalid token");
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json("Server not working");
  }
};
