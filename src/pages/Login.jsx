import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(
      formData.email,
      formData.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    /*
      If the user was trying to order an artwork,
      return them to that page.

      Otherwise go home.
    */

    const returnTo =
      location.state?.from || "/";

    navigate(returnTo, {
      replace: true,
    });
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* Left side */}

        <div className="auth-image">

          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Gustav_Klimt_016.jpg?width=800"
            alt="Artwork"
          />

          <div className="auth-image-text">
            <span>ARTS GALLERY</span>

            <p>
              Art that gives your space
              a story.
            </p>
          </div>

        </div>


        {/* Right side */}

        <div className="auth-form-container">

          <div className="auth-form">

            <span className="auth-label">
              WELCOME BACK
            </span>

            <h1>
              Sign in to your account
            </h1>

            <p className="auth-description">
              Sign in to continue your order
              and manage your artworks.
            </p>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="auth-field">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Password */}

              <div className="auth-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>


              {/* Login */}

              <button
                type="submit"
                className="auth-submit"
              >
                Sign In

                <ArrowRight size={17} />
              </button>

            </form>


            {/* Signup */}

            <p className="auth-switch">

              Don't have an account?

              <Link
                to="/signup"
                state={location.state}
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;