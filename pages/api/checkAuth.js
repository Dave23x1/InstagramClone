import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
