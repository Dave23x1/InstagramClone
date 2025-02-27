import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, fullname, username } = req.body;

  if (!email || !password || !fullname || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { database } = await connectToDatabase();
    const usersCollection = database.collection("user");

    // Check if email or username already exists
    const existingUser = await usersCollection.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "Email or username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = {
      email,
      profile: "/default-profile.png", // Default profile picture
      password: hashedPassword,
      fullname,
      username,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
