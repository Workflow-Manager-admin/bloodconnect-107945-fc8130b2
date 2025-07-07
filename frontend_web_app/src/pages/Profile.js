import React, { useState, useEffect } from "react";
import ProfileForm from "../components/ProfileForm";
import { getUserProfile, updateUserProfile } from "../api";

/**
 * PUBLIC_INTERFACE
 * Profile page for viewing and editing user's personal info.
 * Modern, accessible, dark-themed form. Integrates with mock API for fetching
 * and updating user's name, email, blood type, and donation availability.
 */
function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user profile on load
  useEffect(() => {
    let mounted = true;
    async function fetchProfile() {
      setIsLoading(true);
      const resp = await getUserProfile();
      if (mounted && resp.success) {
        setProfile(resp.user);
        setIsLoading(false);
      } else if (mounted) {
        setApiErrors({form: resp.message || "Could not load profile."});
        setIsLoading(false);
      }
    }
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  // Submission for update
  async function handleProfileSubmit(newVals) {
    setIsSaving(true);
    setSuccessMessage("");
    setApiErrors({});
    const resp = await updateUserProfile(newVals);
    if (resp.success) {
      setProfile(newVals);
      setSuccessMessage(resp.message || "Profile updated successfully.");
      setApiErrors({});
    } else {
      setApiErrors(resp.errors || {form: resp.message || "Update failed"});
      setSuccessMessage("");
    }
    setIsSaving(false);
  }

  return (
    <section className="bc-container" style={{
      marginTop: "2.1rem",
      marginBottom: "2rem",
      background: "var(--bg-secondary)"
    }} aria-label="Profile Section"
    >
      <h2 style={{marginBottom: "0.6rem"}}>Your Profile</h2>
      <p style={{
        color: "var(--text-secondary)",
        marginBottom: "1.2rem"
      }}>
        Manage your account details, blood type, and donation status.
      </p>
      {isLoading && (
        <div style={{margin: "2.2rem auto", textAlign: "center", color: "var(--primary)", fontWeight: 500}}>
          Loading your profile...
        </div>
      )}
      {!isLoading && (
        <>
          {successMessage && (
            <div className="form-success" role="status" style={{
              background: "#d3f9d8",
              color: "#196d21",
              padding: "0.93rem 1.1rem",
              borderRadius: "8px",
              fontWeight: 500,
              marginBottom: 18,
              marginTop: "-0.5rem"
            }}>
              {successMessage}
            </div>
          )}
          <ProfileForm
            initialValues={profile}
            isLoading={isSaving}
            apiErrors={apiErrors}
            onSubmit={handleProfileSubmit}
            isEdit={true}
          />
        </>
      )}
    </section>
  );
}

export default Profile;
