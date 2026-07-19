import { useSelector, useDispatch } from "react-redux";
import Toggle from "../components/Toggle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import Iphoneimage from "../assets/homePage/iphoneimage.png";

const CATEGORIES = ["Woman's Fashion", "Men's Fashion", "Electronics", "Home & Lifestyle", "Medicine", "Sports & Outdoor", "Baby's & Toys", "Groceries & Pets", "Health & Beauty"];

const BROWSE_CATEGORIES = ["Phones", "Computers", "SmartWatch", "Camera", "HeadPhones", "Gaming"];

const FLASH_SALE_ITEMS = [
  { id: "havit-gamepad", name: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, discount: "-40%", rating: "5 Stars", reviews: 88 },
  { id: "ak900-keyboard", name: "AK-900 Wired Keyboard", price: 960, oldPrice: 1160, discount: "-35%", rating: "4 Stars", reviews: 75 },
  { id: "ips-monitor", name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: "-30%", rating: "5 Stars", reviews: 99 },
  { id: "comfort-chair", name: "S-Series Comfort Chair", price: 375, oldPrice: 400, discount: "-25%", rating: "5 Stars", reviews: 99 },
];

const BEST_SELLING_ITEMS = [
  { id: "north-coat", name: "The north coat", price: 260, oldPrice: 360, rating: "5 Stars", reviews: 65 },
  { id: "gucci-duffle", name: "Gucci duffle bag", price: 960, oldPrice: 1160, rating: "4 Stars", reviews: 65 },
  { id: "rgb-cooler", name: "RGB liquid CPU Cooler", price: 160, oldPrice: 170, rating: "4 Stars", reviews: 65 },
  { id: "bookself", name: "Small BookSelf", price: 360, rating: "5 Stars", reviews: 65 },
];

const EXPLORE_PRODUCTS = [
  { id: "dog-food", name: "Breed Dry Dog Food", price: 100, reviews: 35 },
  { id: "dslr-camera", name: "CANON EOS DSLR Camera", price: 360, reviews: 95 },
  { id: "asus-laptop", name: "ASUS FHD Gaming Laptop", price: 700, reviews: 325 },
  { id: "curology-set", name: "Curology Product Set", price: 500, reviews: 145 },
  { id: "electric-car", name: "Kids Electric Car", price: 960, reviews: 65, badge: "NEW" },
  { id: "soccer-cleats", name: "Jr. Zoom Soccer Cleats", price: 1160, reviews: 35 },
  { id: "gp11-gamepad", name: "GP11 Shooter USB Gamepad", price: 660, reviews: 55, badge: "NEW" },
  { id: "satin-jacket", name: "Quilted Satin Jacket", price: 660, reviews: 55 },
];

function ProductCard({ product, showAddToCart = true }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.discount && <span className="badge badge--discount">{product.discount}</span>}
        {product.badge && <span className="badge badge--new">{product.badge}</span>}
        <div className="img-placeholder img-placeholder--product">{product.name} Image</div>

        <Toggle
          render={(on, toggle) => (
            <button
              className="icon-btn icon-btn--wishlist"
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

        {showAddToCart && (
          <button
            className="product-card__add-to-cart"
            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          >
            Add To Cart
          </button>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">
          <span className="price price--current">${product.price}</span>
          {product.oldPrice && <span className="price price--old">${product.oldPrice}</span>}
        </div>
        <div className="product-card__rating">
          <span>[⭐ {product.rating || "5 Stars"}]</span>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="page page--home">
      <Header />

      <main className="home-layout">
        <aside className="home-layout__sidebar">
          <ul className="category-sidebar">
            {CATEGORIES.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </aside>

        <section className="home-layout__hero hero-carousel">
          <div className="hero-carousel__slide">
            <div className="img-placeholder img-placeholder--hero"><img src={Iphoneimage} alt="iPhone 14 Series Hero Image" /></div>
            <div className="hero-carousel__copy">
              <p>iPhone 14 Series</p>
              <h1>Up to 10% off Voucher</h1>
              <a href="#shop-now">Shop Now →</a>
            </div>
          </div>
          <div className="hero-carousel__dots">
            <span>●</span><span>●</span><span className="active">●</span><span>●</span><span>●</span>
          </div>
        </section>

        <section className="section section--flash-sales">
          <div className="section__eyebrow">Today's</div>
          <div className="section__heading-row">
            <h2>Flash Sales</h2>
            <div className="countdown">
              <span>03 Days</span>
              <span>23 Hours</span>
              <span>19 Minutes</span>
              <span>56 Seconds</span>
            </div>
            <div className="carousel-arrows">
              <button aria-label="Previous">[←]</button>
              <button aria-label="Next">[→]</button>
            </div>
          </div>

          <div className="product-grid product-grid--4up">
            {FLASH_SALE_ITEMS.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className="section__action">
            <button className="btn btn--primary">View All Products</button>
          </div>
        </section>

        <hr className="section-divider" />

        <section className="section section--categories">
          <div className="section__eyebrow">Categories</div>
          <div className="section__heading-row">
            <h2>Browse By Category</h2>
            <div className="carousel-arrows">
              <button aria-label="Previous">[←]</button>
              <button aria-label="Next">[→]</button>
            </div>
          </div>

          <div className="category-grid">
            {BROWSE_CATEGORIES.map((category) => (
              <div key={category} className="category-tile">
                <span>[icon: {category}]</span>
                <p>{category}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        <section className="section section--best-selling">
          <div className="section__eyebrow">This Month</div>
          <div className="section__heading-row">
            <h2>Best Selling Products</h2>
            <button className="btn btn--outline">View All</button>
          </div>

          <div className="product-grid product-grid--4up">
            {BEST_SELLING_ITEMS.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        <section className="promo-banner">
          <div className="promo-banner__copy">
            <span className="promo-banner__eyebrow">Categories</span>
            <h2>Enhance Your Music Experience</h2>
            <div className="countdown countdown--circles">
              <span>23 Hours</span>
              <span>05 Days</span>
              <span>59 Minutes</span>
              <span>35 Seconds</span>
            </div>
            <button className="btn btn--accent">Buy Now!</button>
          </div>
          <div className="img-placeholder img-placeholder--banner">Speaker Product Image</div>
        </section>

        <section className="section section--explore">
          <div className="section__eyebrow">Our Products</div>
          <div className="section__heading-row">
            <h2>Explore Our Products</h2>
            <div className="carousel-arrows">
              <button aria-label="Previous">[←]</button>
              <button aria-label="Next">[→]</button>
            </div>
          </div>

          <div className="product-grid product-grid--4up">
            {EXPLORE_PRODUCTS.map((item) => (
              <ProductCard key={item.id} product={item} showAddToCart={item.id === "dslr-camera"} />
            ))}
          </div>

          <div className="section__action">
            <button className="btn btn--primary">View All Products</button>
          </div>
        </section>

        <section className="section section--new-arrival">
          <div className="section__eyebrow">Featured</div>
          <h2>New Arrival</h2>

          <div className="new-arrival-grid">
            <div className="new-arrival-grid__large">
              <div className="img-placeholder img-placeholder--feature">PlayStation 5 Image</div>
              <div className="new-arrival-grid__caption">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <a href="#shop-now">Shop Now</a>
              </div>
            </div>

            <div className="new-arrival-grid__tall">
              <div className="img-placeholder img-placeholder--feature">Women's Collections Image</div>
              <div className="new-arrival-grid__caption">
                <h3>Women's Collections</h3>
                <p>Featured woman collections that give you another vibe.</p>
                <a href="#shop-now">Shop Now</a>
              </div>
            </div>

            <div className="new-arrival-grid__small">
              <div className="img-placeholder img-placeholder--feature">Speakers Image</div>
              <div className="new-arrival-grid__caption">
                <h3>Speakers</h3>
                <p>Amazon wireless speakers</p>
                <a href="#shop-now">Shop Now</a>
              </div>
            </div>

            <div className="new-arrival-grid__small">
              <div className="img-placeholder img-placeholder--feature">Perfume Image</div>
              <div className="new-arrival-grid__caption">
                <h3>Perfume</h3>
                <p>GUCCI INTENSE OUD EDP</p>
                <a href="#shop-now">Shop Now</a>
              </div>
            </div>
          </div>
        </section>

        <section className="perks-row">
          <div className="perks-row__item">
            <span>[🚚]</span>
            <h4>FREE AND FAST DELIVERY</h4>
            <p>Free delivery for all orders over $140</p>
          </div>
          <div className="perks-row__item">
            <span>[🎧]</span>
            <h4>24/7 CUSTOMER SERVICE</h4>
            <p>Friendly 24/7 customer support</p>
          </div>
          <div className="perks-row__item">
            <span>[🛡️]</span>
            <h4>MONEY BACK GUARANTEE</h4>
            <p>We return money within 30 days</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
