import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./styles/index.css";

import withAuth from "./hocs/withAuth";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AccountDropdown from "./components/AccountDropdown";
import NotFound from "./pages/NotFound";

const ProtectedCart = withAuth(Cart);
const ProtectedWishlist = withAuth(Wishlist);
const ProtectedAccountDropdown = withAuth(AccountDropdown);

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ProtectedCart />} />
          <Route path="/wishlist" element={<ProtectedWishlist />} />
          <Route path="/account" element={<ProtectedAccountDropdown />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
