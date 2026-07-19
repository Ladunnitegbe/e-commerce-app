import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="page page--not-found">
      <Header />

      <main className="not-found-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <span>404 Error</span>
        </nav>

        <div className="not-found-page__content">
          <h1 className="not-found-page__code">404 Not Found</h1>
          <p className="not-found-page__message">
            Your visited page not found. You may go home page.
          </p>
          <Link to="/" className="btn btn--primary">
            Back to home page
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
