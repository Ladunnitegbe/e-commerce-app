export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__grid">
        <div className="footer__col">
          <h3 className="footer__brand">Exclusive</h3>
          <h4>Subscribe</h4>
          <p>Get 10% off your first order</p>
          <form className="footer__subscribe">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" aria-label="Subscribe">
              <span>[➤]</span>
            </button>
          </form>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <address>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</address>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div className="footer__col">
          <h4>Account</h4>
          <ul>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Quick Link</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Download App</h4>
          <p>Save $3 with App New User Only</p>
          <div className="footer__app-row">
            <div className="img-placeholder img-placeholder--qr">QR Code</div>
            <div className="footer__app-badges">
              <div className="img-placeholder img-placeholder--badge">Google Play Badge</div>
              <div className="img-placeholder img-placeholder--badge">App Store Badge</div>
            </div>
          </div>
          <div className="footer__socials">
            <span>[Facebook]</span>
            <span>[Twitter]</span>
            <span>[Instagram]</span>
            <span>[LinkedIn]</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
}
