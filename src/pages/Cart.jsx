import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  removeFromCart,
  updateQuantity,
} from "../redux/cartSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  return (
    <div className="page page--cart">
      <Header />

      <main className="cart-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <span>Cart</span>
        </nav>

        <div className="cart-table">
          <div className="cart-table__row cart-table__row--header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {items.length === 0 && (
            <p className="cart-table__empty">Your cart is empty.</p>
          )}

          {items.map((item) => (
            <div key={item.id} className="cart-table__row">
              <div className="cart-table__product">
                <button
                  className="cart-table__remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.name}`}
                >
                  [✕]
                </button>
                <div className="img-placeholder img-placeholder--thumb-sm">{item.name} Image</div>
                <span>{item.name}</span>
              </div>

              <span className="cart-table__price">${item.price}</span>

              <div className="quantity-stepper">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                  }
                />
                <div className="quantity-stepper__arrows">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                    }
                    aria-label="Increase quantity"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                    }
                    aria-label="Decrease quantity"
                  >
                    ▼
                  </button>
                </div>
              </div>

              <span className="cart-table__subtotal">${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="cart-page__actions">
          <Link to="/" className="btn btn--outline">
            Return To Shop
          </Link>
          <button className="btn btn--outline">Update Cart</button>
        </div>

        <div className="cart-page__lower">
          <div className="coupon-block">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn btn--primary">Apply Coupon</button>
          </div>

          <div className="cart-total-card">
            <h2>Cart Total</h2>
            <div className="cart-total-card__row">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <hr />
            <div className="cart-total-card__row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="cart-total-card__row cart-total-card__row--total">
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>
            <button className="btn btn--primary btn--block">Procees to checkout</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
