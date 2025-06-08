export const setToLocalStorage = (key: string, value: Array<number>) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving "${key}" to localStorage`, err);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (err) {
    console.error(`Error reading "${key}" from localStorage`, err);
    return null;
  }
};
