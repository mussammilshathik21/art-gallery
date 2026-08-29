import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "../css/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signup } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    const result = signup(
      formData.name,
      formData.email,
      formData.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    const returnTo =
      location.state?.from || "/";

    navigate(returnTo, {
      replace: true,
    });
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* Image */}

        <div className="auth-image">

          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg?width=800"
            alt="Original artwork"
          />

          <div className="auth-image-text">
            <span>ARTS GALLERY</span>

            <p>
              Discover art.
              Own something meaningful.
            </p>
          </div>

        </div>


        {/* Form */}

        <div className="auth-form-container">

          <div className="auth-form">

            <span className="auth-label">
              JOIN ARTS GALLERY
            </span>

            <h1>
              Create your account
            </h1>

            <p className="auth-description">
              Create an account to save artworks,
              place orders, and manage your collection.
            </p>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit}>

              {/* Name */}

              <div className="auth-field">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


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
                    placeholder="Create a password"
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


              {/* Confirm Password */}

              <div className="auth-field">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Signup */}

              <button
                type="submit"
                className="auth-submit"
              >
                Create Account

                <ArrowRight size={17} />
              </button>

            </form>


            {/* Login */}

            <p className="auth-switch">

              Already have an account?

              <Link
                to="/login"
                state={location.state}
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Signup;