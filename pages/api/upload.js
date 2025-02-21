import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";
import { connectToDatabase } from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), "public/upload"),
    keepExtensions: true,
    multiples: false,
  });

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Upload error" });
    }

    const username = Array.isArray(fields.username)
      ? fields.username[0]
      : fields.username;
    console.log("Checking for username:", username);

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = files.file;
    const newFilename = file.newFilename || file.originalFilename; // ✅ Fix: Ensure filename exists
    const filePath = `/upload/${newFilename}`; // ✅ Fix: Use correct filename
    const name = Array.isArray(files.file) ? files.file[0] : files.file;
    console.log("Parsed file:", name.newFilename);

    try {
      const { database } = await connectToDatabase();
      const usersCollection = database.collection("user");

      // Debugging: Ensure user exists
      const userExists = await usersCollection.findOne({ username });
      if (!userExists) {
        console.log("User not found in database:", username);
        return res.status(404).json({ message: "User not found" });
      }

      // ✅ Update user profile picture in MongoDB
      await usersCollection.updateOne(
        { username },
        { $set: { profile: `/upload/${name.newFilename}` } }
      );

      console.log("Updated profile picture:", filePath);

      return res.status(200).json({
        message: "Profile updated successfully",
        profilePic: filePath,
      });
    } catch (error) {
      console.error("Database update error:", error);
      return res
        .status(500)
        .json({ message: "Database update error", error: error.message });
    }
  });
}
