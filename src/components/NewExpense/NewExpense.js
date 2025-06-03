import React, { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
    const [showForm, setShowForm] = useState(false);

    const saveExpenseDateHandler = (enteredExpenseData) => {
      props.onAddExpense(enteredExpenseData);
      setShowForm(false);
    }

    const onHandleForm = () => {
      setShowForm(true);
    }

    return (
        <div className='new-expense'>
            {!showForm ? 
              <button onClick={onHandleForm}>Add New Expense</button>
            :
              <ExpenseForm onSaveExpenseData={saveExpenseDateHandler} onCancel={() => setShowForm(false)}/>
            }
        </div>
    )
}

export default NewExpense;