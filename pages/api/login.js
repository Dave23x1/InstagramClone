import { connectToDatabase } from "@/lib/mongodb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const { database } = await connectToDatabase();
    const usersCollection = database.collection("user");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Avoid exposing unnecessary data
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set cookie with additional security measures
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1 hour
      })
    );

    return res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, email: user.email, username: user.username }, // Sending user details without password
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
