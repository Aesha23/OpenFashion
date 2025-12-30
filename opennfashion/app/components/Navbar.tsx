"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

import { isLoggedIn, logout } from "@/app/utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogoutClick = () => {
    logout();
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/Homepage">
          <img src="/Logo.png" alt="Open Fashion" />
        </Link>
      </div>

      <div className="navbar-right">
        <FaRegHeart
          className="nav-icon"
          onClick={() => router.push("/wishlist")}
        />

        <IoMdCart className="nav-icon" onClick={() => router.push("/cart")} />

        <CgProfile
          className={`nav-icon ${loggedIn ? "disabled" : ""}`}
          onClick={() => {
            if (!loggedIn) router.push("/login");
          }}
          title={loggedIn ? "Already logged in" : "Login"}
        />

        {loggedIn && (
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
