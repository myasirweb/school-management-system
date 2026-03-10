const STORAGE_KEY = "pages_data";

export const loadPages = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const savePages = (pages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch {}
};

export const clearPages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
