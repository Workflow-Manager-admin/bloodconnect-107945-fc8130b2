import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api";

/**
 * PUBLIC_INTERFACE
 * Registration page for BloodConnect.
 * Renders a registration form, validates input, and calls mock API.
 * Modern, dark brand style; responsive & accessible.
 */
function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle actual form submission
  async function handleRegister(formValues) {
    setIsLoading(true);
    setApiErrors({});
    setSuccessMessage("");
    try {
      const resp = await registerUser(formValues);
      if (resp.success) {
        setSuccessMessage(resp.message || "Registration successful.");
      } else {
        setApiErrors(resp.errors || { form: resp.message || "Registration failed." });
      }
    } catch (e) {
      setApiErrors({ form: "Registration failed. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bc-container" style={{marginTop: "2.1rem", marginBottom: "2rem", background: "var(--bg-secondary)"}} aria-label="Register Section">
      <h2 style={{marginBottom: "0.6rem"}}>Register for BloodConnect</h2>
      <p style={{color:"var(--text-secondary)", marginBottom: "1.2rem"}}>
        Sign up to become a donor or recipient. <span aria-hidden="true" style={{color:"var(--primary)"}}>&#10084;</span>
      </p>
      {successMessage ? (
        <div className="form-success" role="status" style={{
          background: "#d3f9d8", color: "#212", padding: "0.9rem 1rem", borderRadius: "8px", fontWeight: 500, marginBottom: 18
        }}>
          {successMessage}
        </div>
      ) : (
        <AuthForm onSubmit={handleRegister} isLoading={isLoading} apiErrors={apiErrors} variant="register" />
      )}
    </section>
  );
}

export default Register;
