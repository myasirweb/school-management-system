const STORAGE_KEY = "warnings_data";

export const loadWarnings = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveWarnings = (warnings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(warnings));
  } catch {}
};

export const clearWarnings = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
