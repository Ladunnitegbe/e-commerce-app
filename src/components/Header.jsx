import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cartSlice";
import { selectWishlistCount } from "../redux/wishlistSlice";

export default function Header() {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <header className="site-header">
      <div className="top-bar">
        <p className="top-bar__message">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to="/" className="top-bar__cta">
            ShopNow
          </Link>
        </p>
        <div className="top-bar__lang">English <span>[▾]</span></div>
      </div>

      <div className="nav-bar">
        <Link to="/" className="nav-bar__logo">
          Exclusive
        </Link>

        <nav className="nav-bar__links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>

        <div className="nav-bar__actions">
          <form className="nav-bar__search" role="search">
            <input type="text" placeholder="What are you looking for?" />
            <button type="submit" aria-label="Search">
              <span>[🔍]</span>
            </button>
          </form>

          <Link to="/wishlist" className="nav-bar__icon">
            <span>[❤️ Wishlist]</span>
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-bar__icon">
            <span>[🛒 Cart]</span>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          <Link to="/account" className="nav-bar__icon">
            <span>[👤 Account]</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
