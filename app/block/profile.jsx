"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const cookies = parseCookies();

  const token = cookies.authToken;
  const decoded = token ? jwt.decode(token) : null;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (decoded?.username) {
          const userRes = await fetch(`/api/user/${decoded.username}`);
          if (!userRes.ok) throw new Error("User not found");

          const userData = await userRes.json();
          setUser(userData);
        } else {
          throw new Error("Invalid token");
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    };

    if (token) checkAuth();
    else router.push("/");
  }, [router, token]);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div>
        <h1>Dashboard</h1>
        {user ? (
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Full Name:</strong> {user.fullname}
            </p>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </section>
  );
}
