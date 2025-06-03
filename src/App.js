import React, { useState, useEffect } from 'react';
import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import { loadExpenses } from './utils/fileOperations';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Load saved expenses when component mounts
  useEffect(() => {
    const savedExpenses = loadExpenses();
    if (savedExpenses.length > 0) {
      // Convert date strings back to Date objects
      const expensesWithDates = savedExpenses.map(expense => ({
        ...expense,
        date: new Date(expense.date)
      }));
      setExpenses(expensesWithDates);
    }
  }, []);

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = [expense, ...prevExpenses];
      // Save to localStorage whenever expenses are updated
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      return updatedExpenses;
    });
  }

  //JSX Code sample
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses items={expenses}/>
    </div>
  );
}

export default App;
