"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const sessionData = useSession(); // Fix: Prevents destructuring from undefined
  const { data: session, status } = sessionData || {}; // Fix: Avoids destructuring undefined
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      {session?.user?.name ? <p>Welcome, {session.user.name}!</p> : null}
      {/* ✅ Render menu bar here */}
    </section>
  );
}
