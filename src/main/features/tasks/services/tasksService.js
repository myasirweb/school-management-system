const STORAGE_KEY = "tasks_data";

export const loadTasks = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
