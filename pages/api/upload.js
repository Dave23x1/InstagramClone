import multer from "multer";
import cloudinary from "cloudinary";
import { connectToDatabase } from "@/lib/mongodb.js";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Multer Memory Storage (No Local Files)
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Next.js must disable bodyParser for file uploads
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Multer error", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const { username } = req.body; // Get username from request
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }

      // Convert buffer to base64 string for Cloudinary upload
      const fileBuffer = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Upload file directly to Cloudinary from memory
      const result = await cloudinary.v2.uploader.upload(fileBuffer, {
        folder: "nextjs_uploads",
      });

      // Save profile URL in MongoDB
      const { database } = await connectToDatabase();
      const usersCollection = database.collection("user");

      const updateResult = await usersCollection.updateOne(
        { username }, 
        { $set: { profile: result.secure_url } } 
      );

      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        profile: result.secure_url,
      });
    } catch (error) {
      return res.status(500).json({ message: "Upload error", error: error.message });
    }
  });
}
