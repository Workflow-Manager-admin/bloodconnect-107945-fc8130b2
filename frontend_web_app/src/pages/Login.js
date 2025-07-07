import React, { useState } from "react";
import { loginUser } from "../api";

/**
 * PUBLIC_INTERFACE
 * Login page for BloodConnect.
 * Provides a modern, accessible login form with validation and mock API integration.
 * Styled to match the dark/modern brand. Fully responsive and mobile friendly.
 */
function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ------- Validation -------
  function validate(vals) {
    let errors = {};
    if (!vals.usernameOrEmail || !vals.usernameOrEmail.trim()) {
      errors.usernameOrEmail = "Please enter your email or username.";
    } else if (
      // Accepts either plausible email or username (3+ chars, no spaces)
      !/^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|[A-Za-z0-9._-]{3,})$/.test(
        vals.usernameOrEmail.trim()
      )
    ) {
      errors.usernameOrEmail = "Enter a valid email or username.";
    }
    if (!vals.password) errors.password = "Please enter your password.";
    else if (vals.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    return errors;
  }

  // ------- Input Handlers -------
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched({ ...touched, [name]: true });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  // ------- Error Helpers -------
  function getError(field) {
    if (clientErrors[field] && (touched[field] || isSubmitted())) return clientErrors[field];
    if (apiErrors && apiErrors[field]) return apiErrors[field];
    return "";
  }
  function ariaError(field) {
    return getError(field) ? { "aria-invalid": true, "aria-describedby": `${field}-err` } : {};
  }
  function isSubmitted() {
    // Any field touched triggers error display after submit
    return touched.usernameOrEmail || touched.password;
  }

  // ------- Submit Handler -------
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    setApiErrors({});
    // Client-side validation
    const errs = validate(form);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }
    setIsLoading(true);
    try {
      const resp = await loginUser(form);
      if (resp.success) {
        setSuccessMessage(resp.message || "Login successful!");
        setApiErrors({});
      } else {
        setApiErrors(resp.errors || { form: resp.message || "Login failed." });
        setSuccessMessage("");
      }
    } catch (e) {
      setApiErrors({ form: "Login failed. Please try again later." });
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  // ------- Render -------
  return (
    <section
      className="bc-container"
      style={{
        maxWidth: 410,
        margin: "2.5rem auto 2.2rem auto",
        background: "var(--bg-secondary)",
        boxShadow: "0 3.5px 19px rgba(255,40,17,0.07)"
      }}
      aria-label="Login Section"
    >
      <h2 style={{ marginBottom: "0.74rem", fontWeight: 700 }}>Login</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.29rem" }}>
        Enter your credentials to access your BloodConnect account.
      </p>
      {successMessage && (
        <div
          className="form-success"
          role="status"
          style={{
            background: "#d3f9d8",
            color: "#161",
            padding: "0.87rem 1rem",
            borderRadius: "8px",
            fontWeight: 500,
            marginBottom: 18
          }}
        >
          {successMessage}
        </div>
      )}
      {!successMessage && (
        <form
          className="bc-auth-form"
          onSubmit={handleSubmit}
          aria-label="Login form"
          style={{ marginTop: 2, marginBottom: 0 }}
          autoComplete="on"
          noValidate
        >
          <div className="form-row">
            <label htmlFor="usernameOrEmail">
              Username or Email<span className="req">*</span>
            </label>
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              placeholder="you@email.com or username"
              value={form.usernameOrEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              required
              {...ariaError("usernameOrEmail")}
              aria-label="Username or Email"
              spellCheck={false}
            />
            {getError("usernameOrEmail") && (
              <span className="form-error" id="usernameOrEmail-err">
                {getError("usernameOrEmail")}
              </span>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="password">
              Password<span className="req">*</span>
            </label>
            <div style={{ display: "flex", width: "100%" }}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                required
                minLength={6}
                {...ariaError("password")}
                aria-label="Password"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="bc-btn"
                style={{
                  background: "var(--button-bg)",
                  color: "var(--button-text)",
                  borderRadius: "5px",
                  fontSize: "1.07rem",
                  marginLeft: 7,
                  minWidth: 34,
                  padding: "7px 9px",
                  border: "none",
                  cursor: "pointer",
                }}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {getError("password") && (
              <span className="form-error" id="password-err">
                {getError("password")}
              </span>
            )}
          </div>
          <button
            className="bc-btn bc-btn-primary"
            type="submit"
            disabled={isLoading}
            aria-busy={!!isLoading}
            style={{
              marginTop: "1.15rem",
              width: "100%",
              fontWeight: 600,
              fontSize: "1.13rem",
              letterSpacing: "0.04em"
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {apiErrors && apiErrors.form && (
            <div
              className="form-error form-error-general"
              role="alert"
              style={{ marginTop: "0.94rem" }}
            >
              {apiErrors.form}
            </div>
          )}
        </form>
      )}
      <div
        style={{
          marginTop: "1.11rem",
          fontSize: "1.01rem",
          color: "var(--text-secondary)",
          textAlign: "center"
        }}
      >
        Not registered?{" "}
        <a href="/register" className="nav-link" style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 500 }}>
          Create an account
        </a>
      </div>
      <div
        style={{
          marginTop: 8,
          color: "#928",
          fontSize: "0.99rem",
          textAlign: "center",
          opacity: 0.47
        }}
        aria-hidden="true"
      >
        Demo login: <span style={{ color: "#fff", background: "#b71c1c", padding: "1px 5px", borderRadius: "5px" }}>user@example.com / password123</span>
      </div>
    </section>
  );
}

export default Login;
