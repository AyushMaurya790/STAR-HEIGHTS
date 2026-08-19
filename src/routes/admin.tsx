import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [session, setSession] = useState<Session | null>(null);

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const {
  data: { session },
} = await supabase.auth.getSession();

setSession(session);
};
if (session) { 
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Welcome to Star Heights Admin Panel
      </p>
    </div>
  );
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
    <h1 className="mb-6 text-center text-2xl font-bold">
      Admin Login
    </h1>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="mb-4 w-full rounded border p-3"
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mb-6 w-full rounded border p-3"
    />

    <button
      onClick={handleLogin}
      className="w-full rounded bg-black p-3 text-white"
    >
      Login
    </button>
  </div>
</div>
  );
}