import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0, // Expire immediately
      })
    );

    return res.status(200).json({ message: "Logout successful!" });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
