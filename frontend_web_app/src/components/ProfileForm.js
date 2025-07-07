import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Blood type choices (can be extended globally as needed)
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/**
 * PUBLIC_INTERFACE
 * ProfileForm - form for editing/viewing user profile.
 * Props:
 *   initialValues - {name, email, bloodType, wantsToDonate} (optional; form is editable if present)
 *   isLoading - disables controls and shows loading state
 *   apiErrors - {field: message} for error display
 *   onSubmit - function called with new values
 *   isEdit - controls if form is editable
 */
function ProfileForm({ initialValues, isLoading, apiErrors, onSubmit, isEdit = true }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    bloodType: "",
    wantsToDonate: false,
    ...initialValues,
  });
  const [touched, setTouched] = useState({});
  const [clientErrors, setClientErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset form if user changes
  useEffect(() => {
    setValues({
      name: "",
      email: "",
      bloodType: "",
      wantsToDonate: false,
      ...initialValues,
    });
    setTouched({});
    setClientErrors({});
    setSubmitted(false);
  }, [initialValues]);

  function validate(vals) {
    let errors = {};
    if (!vals.name?.trim()) errors.name = "Name is required.";
    if (!vals.email) errors.email = "Email is required.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(vals.email))
      errors.email = "Email is invalid.";
    if (!vals.bloodType) errors.bloodType = "Select a blood type.";
    return errors;
  }

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
  function handleBlur(e) {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  }

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await onSubmit(values);
  }

  function getError(field) {
    if (clientErrors[field] && (touched[field] || submitted)) return clientErrors[field];
    if (apiErrors && apiErrors[field]) return apiErrors[field];
    return "";
  }
  function ariaError(field) {
    return getError(field) ? { "aria-invalid": true, "aria-describedby": `${field}-err` } : {};
  }

  // Render
  return (
    <form className="bc-auth-form" aria-label="Edit Profile Form" autoComplete="off" noValidate onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="form-row">
        <label htmlFor="name">Full Name<span className="req">*</span></label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={!isEdit || isLoading}
          {...ariaError("name")}
        />
        {getError("name") && (
          <span className="form-error" id="name-err">{getError("name")}</span>
        )}
      </div>
      {/* Email */}
      <div className="form-row">
        <label htmlFor="email">Email<span className="req">*</span></label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={!isEdit || isLoading}
          {...ariaError("email")}
        />
        {getError("email") && (
          <span className="form-error" id="email-err">{getError("email")}</span>
        )}
      </div>
      {/* Blood Type */}
      <div className="form-row">
        <label htmlFor="bloodType">Blood Type<span className="req">*</span></label>
        <select
          id="bloodType"
          name="bloodType"
          value={values.bloodType}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          disabled={!isEdit || isLoading}
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
      {/* Available to donate */}
      <div className="form-row horizontal-row" style={{marginBottom: 0}}>
        <input
          type="checkbox"
          id="wantsToDonate"
          name="wantsToDonate"
          checked={values.wantsToDonate}
          onChange={handleChange}
          disabled={!isEdit || isLoading}
          style={{marginRight: 8}}
        />
        <label htmlFor="wantsToDonate" style={{marginBottom: 0}}>
          Available to donate blood
        </label>
      </div>
      {/* Editable */}
      {isEdit && (
        <button
          className="bc-btn bc-btn-primary"
          type="submit"
          disabled={isLoading}
          aria-busy={!!isLoading}
          style={{marginTop: "1.1rem", width: "100%"}}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      )}
      {/* General form error */}
      {apiErrors && apiErrors.form && (
        <div className="form-error form-error-general" role="alert" style={{marginTop: "1.0rem"}}>
          {apiErrors.form}
        </div>
      )}
    </form>
  );
}
ProfileForm.propTypes = {
  initialValues: PropTypes.object,
  isLoading: PropTypes.bool,
  apiErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
};
export default ProfileForm;
