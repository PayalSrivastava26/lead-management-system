"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    source: "facebook",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Lead submitted successfully!");
        setForm({
          name: "",
          email: "",
          message: "",
          source: "facebook",
        });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch {
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">
          Lead Submission Form
        </h1>

        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <textarea
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Message (min 15 chars)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          required
        />

        <select
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          value={form.source}
          onChange={(e) =>
            setForm({ ...form, source: e.target.value })
          }
        >
          <option value="facebook">Facebook</option>
          <option value="google">Google</option>
          <option value="website">Website</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}