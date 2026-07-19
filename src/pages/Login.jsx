import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";

export default function Login() {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    {
      email: ["required", "email"],
      password: ["required"],
    }
  );

  const onValid = async (formValues) => {
    await login(formValues);
    navigate("/");
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
          <h1 className="auth-form__title">Log in to Exclusive</h1>
          <p className="auth-form__subtitle">Enter your details below</p>

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

          <div className="auth-form__actions-row">
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              Log In
            </button>
            <Link to="/forgot-password" className="auth-form__link">
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
