import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";

export default function SignUp() {
  const { signUp, error: authError } = useAuth();
  const navigate = useNavigate();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "" },
    {
      name: ["required"],
      email: ["required", "email"],
      password: ["required", "password"],
    }
  );

  const onValid = async (formValues) => {
    await signUp(formValues);
    // Spec: on successful sign up, show the Login screen
    navigate("/login");
  };

  return (
    <div className="auth-layout">
      <div className="auth-layout__visual">
        <div className="img-placeholder img-placeholder--auth-hero">
          Shopping Cart & Phone Illustration
        </div>
      </div>

      <div className="auth-layout__panel">
        <form className="auth-form" onSubmit={handleSubmit(onValid)} noValidate>
          <h1 className="auth-form__title">Create an account</h1>
          <p className="auth-form__subtitle">Enter your details below</p>

          <div className="auth-form__field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="auth-form__error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="auth-form__field">
            <input
              type="text"
              name="email"
              placeholder="Email or Phone Number"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="auth-form__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="auth-form__field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="auth-form__error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {authError && (
            <p className="auth-form__error auth-form__error--global" role="alert">
              {authError}
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
            Create Account
          </button>

          <button type="button" className="btn btn--outline btn--block">
            <span>[G]</span> Sign up with Google
          </button>

          <p className="auth-form__footer-link">
            Already have account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
