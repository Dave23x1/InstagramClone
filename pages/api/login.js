import { connectToDatabase } from "@/lib/mongodb.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

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

      return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, please try again later." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
