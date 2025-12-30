import { useState } from "react";
import { signup } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input name="address" placeholder="Address" onChange={handleChange} />

        <button>Create Account</button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
