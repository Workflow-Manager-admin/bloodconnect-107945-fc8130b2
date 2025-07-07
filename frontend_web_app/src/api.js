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

/**
 * PUBLIC_INTERFACE
 * Simulate user login "API" call.
 * @param {Object} loginData - Login form data: {usernameOrEmail, password}
 * @returns {Promise<{success: boolean, message?: string, errors?: object, user?: object}>}
 */
export async function loginUser(loginData) {
  // Simulate API response delay
  await new Promise(res => setTimeout(res, 800));
  // Minimal validation
  if (!loginData.usernameOrEmail) {
    return {
      success: false,
      message: "Enter username or email.",
      errors: { usernameOrEmail: "Required." }
    };
  }
  if (!loginData.password) {
    return {
      success: false,
      message: "Enter password.",
      errors: { password: "Required." }
    };
  }
  // Hardcoded user for demo/mock auth
  if (
    (loginData.usernameOrEmail === "user@example.com" || loginData.usernameOrEmail === "donor") &&
    loginData.password === "password123"
  ) {
    return {
      success: true,
      message: "Login successful!",
      user: {
        id: 1,
        name: "Sample Donor",
        email: "user@example.com"
      }
    };
  }
  return {
    success: false,
    message: "Invalid email/username or password.",
    errors: { form: "Login failed. Please check your credentials." }
  };
}
