const STORAGE_KEY = "workboard_data";

export const loadBoards = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

export const saveBoards = (boards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch {}
};

export const clearBoards = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};
