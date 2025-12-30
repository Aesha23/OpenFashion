import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { isLoggedIn, logout } from "../../utils/auth";
import { IoMdCart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getCart } from "../../utils/cart";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const updateCartQty = () => {
      const cart = getCart();
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartQty(totalQty);
    };
    updateCartQty();

    window.addEventListener("cartUpdated", updateCartQty);
    window.addEventListener("storage", updateCartQty);

    return () => {
      window.removeEventListener("cartUpdated", updateCartQty);
      window.removeEventListener("storage", updateCartQty);
    };
  }, []);

  const handleWishlistClick = () => {
    navigate(isLoggedIn() ? "/wishlist" : "/login");
  };

  const handleCartClick = () => {
    navigate(isLoggedIn() ? "/cart" : "/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  // const handleLoginClick = () => {
  //   login();
  //   navigate("/login");
  // };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/">
          <img src="/Logo.png" alt="Open Fashion" />
        </NavLink>
      </div>

      <div className="navbar-right">
        <FaRegHeart className="nav-icon" onClick={handleWishlistClick} />
        <div className="cart-wrapper">
          <IoMdCart className="nav-icon" onClick={handleCartClick} />
          {cartQty > 0 && <span className="quantity">{cartQty}</span>}
        </div>

        <CgProfile
          className={`nav-icon ${isLoggedIn() ? "disabled-icon" : ""}`}
          onClick={isLoggedIn() ? undefined : () => navigate("/login")}
        />

        {isLoggedIn() && (
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
