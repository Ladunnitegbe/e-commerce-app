import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Toggle from "../components/Toggle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

const THUMBNAILS = ["Front View", "Side View", "Angle View", "Back View"];
const COLOURS = ["Navy", "Red"];
const SIZES = ["XS", "S", "M", "L", "XL"];

const RELATED_ITEMS = [
  { id: "havit-gamepad", name: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, discount: "-40%", rating: "5 Stars", reviews: 88 },
  { id: "ak900-keyboard", name: "AK-900 Wired Keyboard", price: 960, oldPrice: 1160, discount: "-35%", rating: "4 Stars", reviews: 75 },
  { id: "ips-monitor", name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: "-30%", rating: "5 Stars", reviews: 99 },
  { id: "rgb-cooler", name: "RGB liquid CPU Cooler", price: 160, oldPrice: 170, rating: "4 Stars", reviews: 65 },
];

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedColour, setSelectedColour] = useState(COLOURS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);

  // Replace with a real product lookup (by id) against your product data source
  const product = {
    id,
    name: "Havic HV G-92 Gamepad",
    price: 192.0,
    rating: "4 Stars",
    reviews: 150,
    inStock: true,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, colour: selectedColour, size: selectedSize, quantity }));
  };

  return (
    <div className="page page--product-details">
      <Header />

      <main className="product-details">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/account">Account</Link> / <span>Gaming</span> / <span>{product.name}</span>
        </nav>

        <div className="product-details__layout">
          <div className="product-details__gallery">
            <div className="product-details__thumbnails">
              {THUMBNAILS.map((label) => (
                <button key={label} className="img-placeholder img-placeholder--thumb">
                  {label}
                </button>
              ))}
            </div>
            <div className="img-placeholder img-placeholder--main-product">{product.name} — Main Image</div>
          </div>

          <div className="product-details__info">
            <h1>{product.name}</h1>
            <div className="product-details__meta">
              <span>[⭐ {product.rating}]</span>
              <span className="product-details__reviews">({product.reviews} Reviews)</span>
              <span className="divider">|</span>
              <span className="product-details__stock">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            <p className="product-details__price">${product.price.toFixed(2)}</p>
            <p className="product-details__description">{product.description}</p>

            <hr className="section-divider" />

            <div className="product-details__variant">
              <span className="product-details__variant-label">Colours:</span>
              {COLOURS.map((colour) => (
                <button
                  key={colour}
                  className={`swatch ${selectedColour === colour ? "swatch--selected" : ""}`}
                  onClick={() => setSelectedColour(colour)}
                  aria-label={colour}
                >
                  [{colour[0]}]
                </button>
              ))}
            </div>

            <div className="product-details__variant">
              <span className="product-details__variant-label">Size:</span>
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`size-box ${selectedSize === size ? "size-box--selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="product-details__actions">
              <div className="quantity-stepper">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>

              <button className="btn btn--primary" onClick={handleAddToCart}>
                Buy Now
              </button>

              <Toggle
                render={(on, toggle) => (
                  <button
                    className="icon-btn icon-btn--wishlist-outline"
                    onClick={() => {
                      toggle();
                      if (!on) dispatch(addToWishlist(product));
                    }}
                    aria-label="Toggle wishlist"
                  >
                    {on ? "[❤️]" : "[🤍]"}
                  </button>
                )}
              />
            </div>

            <div className="product-details__delivery-card">
              <div className="delivery-row">
                <span>[🚚]</span>
                <div>
                  <p className="delivery-row__title">Free Delivery</p>
                  <a href="#delivery">Enter your postal code for Delivery Availability</a>
                </div>
              </div>
              <div className="delivery-row">
                <span>[↩️]</span>
                <div>
                  <p className="delivery-row__title">Return Delivery</p>
                  <p>
                    Free 30 Days Delivery Returns. <a href="#details">Details</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="section section--related">
          <div className="section__heading-row">
            <div className="section__eyebrow">Related Item</div>
          </div>

          <div className="product-grid product-grid--4up">
            {RELATED_ITEMS.map((item) => (
              <article key={item.id} className="product-card">
                <div className="product-card__media">
                  {item.discount && <span className="badge badge--discount">{item.discount}</span>}
                  <div className="img-placeholder img-placeholder--product">{item.name} Image</div>
                  <Toggle
                    render={(on, toggle) => (
                      <button className="icon-btn icon-btn--wishlist" onClick={toggle} aria-label="Toggle wishlist">
                        {on ? "[❤️]" : "[🤍]"}
                      </button>
                    )}
                  />
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__name">{item.name}</h3>
                  <div className="product-card__price">
                    <span className="price price--current">${item.price}</span>
                    {item.oldPrice && <span className="price price--old">${item.oldPrice}</span>}
                  </div>
                  <div className="product-card__rating">
                    <span>[⭐ {item.rating}]</span>
                    <span className="product-card__reviews">({item.reviews})</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
