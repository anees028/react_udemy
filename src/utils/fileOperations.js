const STORAGE_KEY = 'expenses';

// Load expenses from localStorage
export const loadExpenses = () => {
  try {
    const expenses = localStorage.getItem(STORAGE_KEY);
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

// Save expenses to localStorage
export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
    throw error;
  }
}; 