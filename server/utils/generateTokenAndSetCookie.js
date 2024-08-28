import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SESSION_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("authToken", token, {
    httpOnly: true, // This ensures cookie wont be accessed by the client side js (prevents xss)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents csrf
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
