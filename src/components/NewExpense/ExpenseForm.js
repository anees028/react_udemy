import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {

  //Using the 3 seperate states.
  const [ enteredTitle, setEnteredTitle ] = useState('');
  const [ enteredAmount, setEnteredAmount ] = useState('');
  const [ enteredDate, setEnteredDate ] = useState('');
  const [ showForm, setShowForm ] = useState(false);
  

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
    
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    }
    debugger
    if(expenseData.title !== '' && expenseData.amount !== 0){
      props.onSaveExpenseData(expenseData)
    }
    defaultValue();
  }

  const defaultValue = () => {
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredTitle('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        {showForm ? <>
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
            <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler}/>
          </div>
          <div className="new-expense__actions">
            <button type="submit" onClick={() => {setShowForm(false)}}>Cancel</button>
          </div>
        </> : <></>}
        <div className="new-expense__actions">
          <button type="submit" onClick={() => {setShowForm(true)}}>Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
