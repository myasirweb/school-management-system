const STORAGE_KEY = "groups_data";

export const loadGroups = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveGroups = (groups) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  } catch {}
};

export const clearGroups = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
