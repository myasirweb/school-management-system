const STORAGE_KEY = "complaints_data";

export const loadComplaints = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveComplaints = (complaints) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  } catch {}
};

export const clearComplaints = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
