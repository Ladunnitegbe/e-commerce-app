import { useSelector, useDispatch } from "react-redux";
import { selectWishlistItems, removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JUST_FOR_YOU = [
  { id: "asus-laptop", name: "ASUS FHD Gaming Laptop", price: 960, oldPrice: 1160, discount: "-35%", rating: "5 Stars", reviews: 65 },
  { id: "ips-monitor", name: "IPS LCD Gaming Monitor", price: 1160, rating: "5 Stars", reviews: 65 },
  { id: "havit-gamepad", name: "HAVIT HV-G92 Gamepad", price: 560, badge: "NEW", rating: "5 Stars", reviews: 65 },
  { id: "ak900-keyboard", name: "AK-900 Wired Keyboard", price: 200, rating: "5 Stars", reviews: 65 },
];

export default function Wishlist() {
  const items = useSelector(selectWishlistItems);
  const dispatch = useDispatch();

  const moveAllToBag = () => {
    items.forEach((item) => dispatch(addToCart({ ...item, quantity: 1 })));
    dispatch(clearWishlist());
  };

  return (
    <div className="page page--wishlist">
      <Header />

      <main className="wishlist-page">
        <div className="section__heading-row">
          <h1>Wishlist ({items.length})</h1>
          <button className="btn btn--outline" onClick={moveAllToBag} disabled={items.length === 0}>
            Move All To Bag
          </button>
        </div>

        <div className="product-grid product-grid--4up">
          {items.length === 0 && <p>Your wishlist is empty.</p>}

          {items.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-card__media">
                {item.discount && <span className="badge badge--discount">{item.discount}</span>}
                <div className="img-placeholder img-placeholder--product">{item.name} Image</div>
                <button
                  className="icon-btn icon-btn--delete"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  [🗑️]
                </button>
              </div>
              <div className="product-card__body">
                <h3 className="product-card__name">{item.name}</h3>
                <div className="product-card__price">
                  <span className="price price--current">${item.price}</span>
                  {item.oldPrice && <span className="price price--old">${item.oldPrice}</span>}
                </div>
              </div>
              <button className="product-card__add-to-cart-static" onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
                Add To Cart
              </button>
            </article>
          ))}
        </div>

        <section className="section section--just-for-you">
          <div className="section__heading-row">
            <div className="section__eyebrow">Just For You</div>
            <button className="btn btn--outline">See All</button>
          </div>

          <div className="product-grid product-grid--4up">
            {JUST_FOR_YOU.map((item) => (
              <article key={item.id} className="product-card">
                <div className="product-card__media">
                  {item.discount && <span className="badge badge--discount">{item.discount}</span>}
                  {item.badge && <span className="badge badge--new">{item.badge}</span>}
                  <div className="img-placeholder img-placeholder--product">{item.name} Image</div>
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
                <button className="product-card__add-to-cart-static" onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
                  Add To Cart
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
