const STORAGE_KEY = "projects_data";

export const loadProjects = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {}
};

export const clearProjects = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
