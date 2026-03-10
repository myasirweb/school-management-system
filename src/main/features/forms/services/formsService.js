const STORAGE_KEY = "forms_data";

export const loadForms = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveForms = (forms) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch {}
};

export const clearForms = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
