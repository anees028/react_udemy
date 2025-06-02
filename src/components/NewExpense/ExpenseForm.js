import React, { useState, useEffect } from "react";
import "./ExpenseForm.css";
import { loadExpenses, saveExpenses } from "../../utils/fileOperations";

const ExpenseForm = (props) => {

  //Using the 3 seperate states.
  const [ enteredTitle, setEnteredTitle ] = useState('');
  const [ enteredAmount, setEnteredAmount ] = useState('');
  const [ enteredDate, setEnteredDate ] = useState('');
  const [ lastId, setLastId ] = useState(0);  // Track the last used ID
  
  // Load existing expenses and set lastId on component mount
  useEffect(() => {
    const existingExpenses = loadExpenses();
    if (existingExpenses.length > 0) {
      const maxId = Math.max(...existingExpenses.map(expense => expense.id));
      setLastId(maxId);
    }
  }, []);

  // Get today's date and format it as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  // Get date 5 years from now and format it as YYYY-MM-DD
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  //using the state as signle object form
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate:''
  // })

  
  // const titleChangeHandler = (event) =>{
  //   //Using the seperate states.
  //   setEnteredTitle(event.target.value);
   
  //   //Using the multiple object state form.
  //   // setUserInput((prevState) => {
  //   //   return {...prevState, enteredTitle: event.target.value}
  //   // })
  // }
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  }
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  }

  //Generic Input Handler Change function
  const inputChangehandler = (identifier, value) => {
    if(identifier === 'title'){
      setEnteredTitle(value);
    }else if(identifier === 'amount'){
      setEnteredAmount(value);
    }else{
      setEnteredDate(value);
    }
  }


  const submitHandler = (event) => {
    event.preventDefault();

    const newId = lastId + 1;  // Increment the ID
    setLastId(newId);  // Update the last used ID

    const expenseData = {
      id: newId,
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    }
    if(expenseData.title !== '' && expenseData.amount !== 0){
      try {
        // Load existing expenses
        const existingExpenses = loadExpenses();
        // Add new expense
        const updatedExpenses = [...existingExpenses, expenseData];
        // Save updated expenses
        saveExpenses(updatedExpenses);
        // Call parent component's handler
        props.onSaveExpenseData(expenseData);
        defaultValue();
      } catch (error) {
        console.error('Error saving expense:', error);
        // You might want to show an error message to the user here
      }
    }
  }

  const defaultValue = () => {
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredTitle('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={(event) => inputChangehandler('title', event.target.value)} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input 
            type="date" 
            min={today} 
            max={maxDateFormatted} 
            value={enteredDate} 
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-expense__actions">
          <button type="submit" onClick={props.onCancel}>Cancel</button>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
