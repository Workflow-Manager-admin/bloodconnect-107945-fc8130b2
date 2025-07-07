import React, { useState } from "react";
import PropTypes from "prop-types";

// Brand blood types for dropdown
const BLOOD_TYPES = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

// Helper for simple password strength (basic)
function passwordStrength(pwd) {
  if (!pwd) return 0;
  if (pwd.length < 8) return 0;
  let score = 1;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

/**
 * PUBLIC_INTERFACE
 * Reusable AuthForm component for registration.
 * Props:
 *   onSubmit - function called with form values if valid
 *   isLoading - disables button and shows loading
 *   apiErrors - errors returned from API (object keyed by field)
 *   variant - 'register' or possible future 'login'
 */
function AuthForm({ onSubmit, isLoading, apiErrors, variant = "register" }) {
  // State
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    wantsToDonate: true,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [clientErrors, setClientErrors] = useState({});

  // Validation
  function validate(vals) {
    let errors = {};
    if (!vals.name.trim()) errors.name = "Name is required.";
    if (!vals.email) errors.email = "Email is required.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(vals.email))
      errors.email = "Email is invalid.";
    if (!vals.password) errors.password = "Password is required.";
    else if (vals.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    else if (passwordStrength(vals.password) < 2)
      errors.password = "Password should include a number or uppercase letter.";
    if (!vals.confirmPassword) errors.confirmPassword = "Please confirm password.";
    else if (vals.confirmPassword !== vals.password)
      errors.confirmPassword = "Passwords do not match.";
    if (!vals.bloodType) errors.bloodType = "Select a blood type.";
    return errors;
  }

  // On input change
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  }

  // On blur
  function handleBlur(e) {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  }

  // On form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) return;
    // Call parent onSubmit (may be async)
    await onSubmit(values);
  }

  // Per field errors (client and api)
  function getError(field) {
    if (clientErrors[field] && (touched[field] || submitted)) return clientErrors[field];
    if (apiErrors && apiErrors[field]) return apiErrors[field];
    return "";
  }
  // Accessibility - describe error per field inline
  function ariaError(field) {
    return getError(field) ? { "aria-invalid": true, "aria-describedby": `${field}-err` } : {};
  }

  return (
    <form className="bc-auth-form" autoComplete="off" noValidate onSubmit={handleSubmit} aria-label="Registration form">
      <div className="form-row">
        <label htmlFor="name">Full Name<span className="req">*</span></label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          {...ariaError("name")}
        />
        {getError("name") && (
          <span className="form-error" id="name-err">{getError("name")}</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="email">Email<span className="req">*</span></label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          {...ariaError("email")}
        />
        {getError("email") && (
          <span className="form-error" id="email-err">{getError("email")}</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="password">Password<span className="req">*</span></label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          minLength={8}
          {...ariaError("password")}
        />
        {getError("password") && (
          <span className="form-error" id="password-err">{getError("password")}</span>
        )}
        <span className="password-meter"
          aria-live="polite"
          style={{
            display: values.password ? "inline-block" : "none",
            color: passwordStrength(values.password) > 2 ? "limegreen" : passwordStrength(values.password) > 1 ? "#ffa726" : "#f05050"
          }}>
          {values.password && passwordStrength(values.password) === 3 && "Strong"}
          {values.password && passwordStrength(values.password) === 2 && "Good"}
          {values.password && passwordStrength(values.password) <= 1 && "Weak"}
        </span>
      </div>
      <div className="form-row">
        <label htmlFor="confirmPassword">Confirm Password<span className="req">*</span></label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          {...ariaError("confirmPassword")}
        />
        {getError("confirmPassword") && (
          <span className="form-error" id="confirmPassword-err">{getError("confirmPassword")}</span>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="bloodType">Blood Type<span className="req">*</span></label>
        <select
          id="bloodType"
          name="bloodType"
          value={values.bloodType}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          {...ariaError("bloodType")}
        >
          <option value="">-- Select --</option>
          {BLOOD_TYPES.map(bt => (
            <option value={bt} key={bt}>{bt}</option>
          ))}
        </select>
        {getError("bloodType") && (
          <span className="form-error" id="bloodType-err">{getError("bloodType")}</span>
        )}
      </div>
      <div className="form-row horizontal-row" style={{marginBottom: 0}}>
        <input
          type="checkbox"
          id="wantsToDonate"
          name="wantsToDonate"
          checked={values.wantsToDonate}
          onChange={handleChange}
          style={{marginRight: 8}}
        />
        <label htmlFor="wantsToDonate" style={{marginBottom: 0}}>
          I am registering as a blood donor
        </label>
      </div>
      <button
        className="bc-btn bc-btn-primary"
        type="submit"
        disabled={isLoading}
        aria-busy={!!isLoading}
        style={{marginTop: "0.95rem", width: "100%"}}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {/* public form errors (API generic) */}
      {apiErrors && apiErrors.form && (
        <div className="form-error form-error-general" role="alert" style={{marginTop: "1rem"}}>{apiErrors.form}</div>
      )}
    </form>
  );
}
AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  apiErrors: PropTypes.object,
  variant: PropTypes.string,
};

export default AuthForm;
