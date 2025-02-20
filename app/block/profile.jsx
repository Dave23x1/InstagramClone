"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { authToken: token } = parseCookies();

  useEffect(() => {
    if (!token) return;

    const decoded = jwt.decode(token);
    if (!decoded?.username) return console.error("Invalid token");

    fetch(`/api/user/${decoded.username}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("User not found")))
      .then(setUser)
      .catch(console.error);
  }, [token]);

  return (
    <section>
      <div>
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
