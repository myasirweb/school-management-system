import { generateUserId } from "../utils/registrationHelper";

const STORAGE_KEYS = {
  REGISTERED_USERS: "registeredUsers",
};

/**
 * Get all registered users from localStorage
 */
export const getRegisteredUsers = () => {
  const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

/**
 * Check if email is already registered
 */
export const isEmailTaken = (email) => {
  const users = getRegisteredUsers();
  return users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
};

/**
 * Register a new user
 */
export const registerUser = (formData) => {
  // Check if email already exists in registered users
  if (isEmailTaken(formData.email)) {
    return { success: false, error: "This email is already registered" };
  }

  // Check if email exists in dummy users (allUsers)
  const allUsersRaw = localStorage.getItem("allUsers");
  if (allUsersRaw) {
    const allUsers = JSON.parse(allUsersRaw);
    const exists = allUsers.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (exists) {
      return { success: false, error: "This email is already in use" };
    }
  }

  const newUser = {
    id: generateUserId(),
    role: formData.role,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
    profilePhoto: formData.profilePhoto || null,
    roleSpecificData: formData.roleSpecificData || {},
    registeredAt: new Date().toISOString(),
    status: "pending",
  };

  const users = getRegisteredUsers();
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));

  return { success: true, user: newUser };
};
