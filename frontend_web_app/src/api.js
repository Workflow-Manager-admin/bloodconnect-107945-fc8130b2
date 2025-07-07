//
// PUBLIC_INTERFACE
// Mock API for BloodConnect registration and other endpoints
//

/**
 * PUBLIC_INTERFACE
 * Simulate user registration API call.
 * @param {Object} userData - Registration form data: {name, email, password, bloodType, ...}
 * @returns {Promise<{success: boolean, message: string|null, errors?: object}>}
 */
export async function registerUser(userData) {
  // Simulate basic "API" validation (normally, would happen server-side)
  await new Promise(res => setTimeout(res, 750));
  if (userData.email === "already@registered.com") {
    return {
      success: false,
      message: "Email is already registered.",
      errors: { email: "This email is already in use." }
    };
  }
  // Simulate success for all other data
  return {
    success: true,
    message: "Registration successful! Welcome to BloodConnect."
  };
}
