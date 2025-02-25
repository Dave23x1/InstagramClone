import { getToken } from "next-auth/jwt";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const authToken = cookies.authToken;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!authToken && !session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    if (authToken) {
      jwt.verify(authToken, JWT_SECRET_KEY);
    }
    return res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
