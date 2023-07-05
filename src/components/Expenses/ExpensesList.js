import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {

    const expense = props.item;
  //let expensesContent = <p>No expense found.</p>

  if(expense.length === 0){
    return <h2 className='expenses-list__fallback'>Found no expoenses.</h2>
  }

  return(
    <ul className='expenses-list'>
        {expense.map(expense => (
            <ExpenseItem
                key={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}  
            />
        ))}
    </ul>
  )

}

export default ExpensesList;