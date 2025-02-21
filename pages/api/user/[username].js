import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username } = req.query;
  console.log("Requested username:", username);

  try {
    const { database } = await connectToDatabase();
    console.log("Connected to database");

    const user = await database.collection("user").findOne({
      username: { $regex: `^${username}$`, $options: "i" },
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      profile: user.profile,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
