import { connectToDatabase } from "@/lib/mongodb.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, fullname, username } = req.body;

    const { database } = await connectToDatabase();
    const usersCollection = database.collection("user");

    const user = await usersCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        profile: profile || "/default-profile.png",
        password: hashedPassword,
        fullname,
        username,
        createdAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);
      return res
        .status(201)
        .json({ message: "User created", userId: result.insertedId });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
