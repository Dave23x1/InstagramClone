import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDatabase } from "@/lib/mongodb";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { database } = await connectToDatabase();
      const usersCollection = database.collection("users");

      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        await usersCollection.insertOne({
          email: user.email,
          name: user.name,
          profile: user.image,
          provider: "facebook",
          createdAt: new Date(),
        });
      }

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // Redirect users to your login page
  },
});
