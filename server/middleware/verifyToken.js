import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token)
    return res.status(401).json("You are not authenticated! - no token");

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json("You are not authenticated! - invalid token");
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json("Server not working");
  }
};
