import useAuth from "../hooks/useAuth";
import Toggle from "./Toggle";

export default function AccountDropdown() {
  const { user, logOut } = useAuth();

  return (
    <Toggle
      render={(on, toggle) => (
        <div>
          <button onClick={toggle}>{user?.displayName || user?.email}</button>
          {on && (
            <div>
              <a href="/account">Manage My Account</a>
              <a href="/cart">Cart</a>
              <a href="/wishlist">Wishlist</a>
              <button onClick={logOut}>Logout</button>
            </div>
          )}
        </div>
      )}
    />
  );
}
