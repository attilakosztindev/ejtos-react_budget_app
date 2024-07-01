import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { expenses, budget, dispatch, currency } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);
  const [shouldDispatch, setShouldDispatch] = useState(true);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const handleBudgetChange = (event) => {
    const updatedBudget = Number(event.target.value);
    setNewBudget(updatedBudget);
    if (shouldDispatch) {
      dispatch({ type: 'SET_BUDGET', payload: updatedBudget });
    }
  };

  const handleBudgetBlur = () => {
    setShouldDispatch(false);
    if (newBudget < totalExpenses) {
      alert('You cannot reduce the budget value lower than the spending');
      setNewBudget(2000);
      dispatch({ type: 'SET_BUDGET', payload: 2000 });
    } else {
      dispatch({ type: 'SET_BUDGET', payload: newBudget });
    }
    setShouldDispatch(true);
  };

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  return (
    <div className='alert alert-secondary d-flex align-items-center'>
      <span>Budget:</span>
      <span style={{marginLeft: '6px'}}>{currency}</span>
      <input
        className="form-control"
        type="number"
        step="10"
        max={20000}
        value={newBudget}
        onChange={handleBudgetChange}
        onBlur={handleBudgetBlur}
      />
    </div>
  );
};

export default Budget;