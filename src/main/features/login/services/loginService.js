import dummyUsers from "../utils/dummyUsers";

const STORAGE_KEYS = {
  SCHOOL_USER: "schoolUser",
  ALL_USERS: "allUsers",
  REMEMBER_ME: "rememberMe",
  REGISTERED_USERS: "registeredUsers",
};

/**
 * Seed dummy users into localStorage on first app load
 */
export const seedUsers = () => {
  const existing = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(dummyUsers));
  }
};

/**
 * Authenticate user with email and password
 * Checks both dummy users and registered users
 */
export const loginUser = (email, password, rememberMe = false) => {
  // Check dummy users first
  const usersRaw = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
  const users = usersRaw ? JSON.parse(usersRaw) : dummyUsers;

  let user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // If not found in dummy users, check registered users
  if (!user) {
    const registeredRaw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (registeredRaw) {
      const registeredUsers = JSON.parse(registeredRaw);
      const regUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (regUser) {
        user = {
          id: regUser.id,
          name: regUser.fullName,
          email: regUser.email,
          role: regUser.role,
          department: regUser.roleSpecificData?.department || regUser.role,
          password: regUser.password,
        };
      }
    }
  }

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const sessionData = {
    id: user.id,
    name: user.name || user.fullName,
    email: user.email,
    role: user.role,
    department: user.department || user.role,
    token: `dummy-token-${user.id}-${Date.now()}`,
    loginTime: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.SCHOOL_USER, JSON.stringify(sessionData));

  if (rememberMe) {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, JSON.stringify({ email }));
  } else {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  }

  return { success: true, user: sessionData };
};

/**
 * Logout current user
 */
export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.SCHOOL_USER);
};

/**
 * Get current logged-in user from localStorage
 */
export const getCurrentUser = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.SCHOOL_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/**
 * Get remembered email if exists
 */
export const getRememberedEmail = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
  if (!raw) return "";
  try {
    return JSON.parse(raw).email || "";
  } catch {
    return "";
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
