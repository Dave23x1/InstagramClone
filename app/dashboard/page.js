"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    } else if (session.status === "authenticated") {
      setLoading(false);
    }
  }, [session.status, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      {session?.data && <p>Welcome, {session.data.user.name}!</p>}
      {/* Render menu bar */}
    </section>
  );
}
