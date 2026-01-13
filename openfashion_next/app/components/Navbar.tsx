"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AUTH_EVENT, isLoggedIn, logout } from "@/app/utils/auth";
import { protectedNavigate } from "../utils/protectedNavigate";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

export default function Navbar() {
  const router = useRouter();
  const cartQty = useCart();
  const wishlistCount = useWishlist();

  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncAuth = () => setLoggedIn(isLoggedIn());
    syncAuth();
    window.addEventListener(AUTH_EVENT, syncAuth);
    return () => window.removeEventListener(AUTH_EVENT, syncAuth);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        <img src="/logo.png" alt="Logo" />
      </Link>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          HOME
        </Link>
        <span
          onClick={() => {
            setMenuOpen(false);
            protectedNavigate(router, "/shop");
          }}
        >
          SHOP
        </span>
        <span
          onClick={() => {
            setMenuOpen(false);
            protectedNavigate(router, "/profile");
          }}
        >
          PROFILE
        </span>
      </nav>

      <div className="nav-icons">
        <div
          className="icon-wrapper"
          onClick={() => protectedNavigate(router, "/wishlist")}
        >
          <FaRegHeart className="icon" />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </div>

        <div
          className="icon-wrapper"
          onClick={() => protectedNavigate(router, "/cart")}
        >
          <IoMdCart className="icon" />
          {cartQty > 0 && <span className="badge">{cartQty}</span>}
        </div>

        {loggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </div>
      </div>
    </header>
  );
}
