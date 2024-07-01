import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
  const { currency, dispatch } = useContext(AppContext);

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    dispatch({ type: 'CHG_CURRENCY', payload: selectedCurrency });
  };

  return (
    <div className="currency-selector alert alert-success d-flex align-items-center" style={{minHeight: '72px'}}>
      <span>Currency</span>
      <span style={{marginRight: '6px'}}>({currency}):</span>
      <select
        className="form-select"
        value={currency}
        onChange={handleCurrencyChange}
      >
        <option value="£">£ Pound</option>
        <option value="$">$ Dollar</option>
        <option value="€">€ Euro</option>
        <option value="₹">₹ Rupee</option>
      </select>
    </div>
  );
};

export default CurrencySelector;