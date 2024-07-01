import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Remaining = () => {
  const { expenses, budget, currency } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);
  const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';
  return (
    <div className={`alert ${alertType} d-flex align-items-center`} style={{minHeight: '72px'}}>
      <span>Remaining: {currency}{budget - totalExpenses}</span>
    </div>
  );
};
export default Remaining;
