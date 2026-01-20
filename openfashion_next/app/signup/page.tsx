"use client";

import Link from "next/link";
import { useState } from "react";
import { signup } from "../utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
      toast.error("All fields required");
      return;
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(trimmedName)) {
      toast.error("Name must contain only String and spaces");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Email must be valid");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 6 characters long, include 1 uppercase letter and 1 number",
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

        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        
        <label>Address:</label>
        <input name="address" value={form.address} onChange={handleChange} />

        <button type="submit">Create Account</button>

        <p className="auth-que">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
