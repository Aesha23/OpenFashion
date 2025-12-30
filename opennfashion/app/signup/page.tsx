"use client";

import Link from "next/link";
import { useState } from "react";
import { signup } from "../utils/auth";
import { useRouter } from "next/navigation";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  address: string;
}

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, address } = form;

    if (!name || !email || !password || !address) {
      alert("All fields required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email must be valid");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        "Password must be at least 6 characters long, include 1 uppercase letter and 1 number"
      );
      return;
    }

    signup(form);
    router.push("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <button type="submit">Create Account</button>

        <p className="auth-footer">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
