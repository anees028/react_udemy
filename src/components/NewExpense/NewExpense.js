import React, { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';


const NewExpense = (props) => {

    const [showForm, setShowForm] = useState(false);

    const saveExpenseDateHandler = (enteredExpenseData) => {
      const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString(),
      }  
      props.onAddExpense(expenseData)
      //console.log(expenseData)
    }

    const onHandleForm = () => {
      setShowForm(true)
    }

    return (
        <div className='new-expense'>
            {!showForm ? 
              <button onClick={onHandleForm}>Add New Todo</button>
            :
              <ExpenseForm onSaveExpenseData={saveExpenseDateHandler} onCancel={() => setShowForm(false)}/>
            }
        </div>
    )

}

export default NewExpense;