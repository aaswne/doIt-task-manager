"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !dob) return alert("Please fill all fields");

    localStorage.setItem("user", JSON.stringify({ name, dob }));

    router.push("/dashboard");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome 👋</h1>
        <p>Enter your details to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
          placeholder="Enter your birthday"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button type="submit">Continue</button>
        </form>

        <p className="note">Simple, fast, minimal experience</p>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #1e293b, #0f172a);
          font-family: system-ui;
        }

        .card {
          width: 360px;
          padding: 32px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          text-align: center;
        }

        h1 {
          margin-bottom: 6px;
          font-size: 22px;
        }

        p {
          font-size: 13px;
          opacity: 0.7;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          outline: none;
        }

        input:focus {
          border-color: #60a5fa;
        }

        button {
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          font-weight: 500;
        }

        button:hover {
          background: #2563eb;
        }

        .note {
          margin-top: 12px;
          font-size: 12px;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}