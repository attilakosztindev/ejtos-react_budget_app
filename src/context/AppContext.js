import React, { createContext, useReducer } from 'react';

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const updatedExpenses = state.expenses.map((exp) =>
        exp.name === action.payload.name
          ? { ...exp, cost: exp.cost + action.payload.cost }
          : exp
      );
      const totalBudget = updatedExpenses.reduce((total, exp) => total + exp.cost, 0);

      if (totalBudget > state.budget) {
        alert("Cannot increase the allocation! Out of funds");
        return state;
      }
      return {
        ...state,
        expenses: updatedExpenses,
      };

    case 'RED_EXPENSE':
      const reducedExpenses = state.expenses.map((exp) =>
        exp.name === action.payload.name && exp.cost - action.payload.cost >= 0
          ? { ...exp, cost: exp.cost - action.payload.cost }
          : exp
      );
      return {
        ...state,
        expenses: reducedExpenses,
        budget: state.budget + action.payload.cost,
      };

    case 'DELETE_EXPENSE':
      const remainingExpenses = state.expenses.map((exp) =>
              exp.name === action.payload
                      ? { ...exp, cost: 0 }
                      : exp
      );
      return {
        ...state,
        expenses: remainingExpenses,
      };

    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };

    case 'CHG_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  budget: 2000,
  expenses: [
    { id: "Marketing", name: 'Marketing', cost: 50 },
    { id: "Finance", name: 'Finance', cost: 300 },
    { id: "Sales", name: 'Sales', cost: 70 },
    { id: "Human Resource", name: 'Human Resource', cost: 40 },
    { id: "IT", name: 'IT', cost: 500 },
  ],
  currency: '£',
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const remaining = state.expenses.reduce((total, item) => total + item.cost, 0);

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: state.budget - remaining,
        dispatch,
        currency: state.currency
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};