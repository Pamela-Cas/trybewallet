export const SET_EXPENSE = 'SET_EXPENSE';
export const GET_CHANGE_RATES = 'GET_CURRENCIES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const wallet = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = wallet, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.reduce((acc, expense) => {
        if (expense.id === action.id) {
          return [...acc, action.payload];
        }
        return [...acc, expense];
      }, []),
    };
  default:
    return state;
  }
};

export default walletReducer;
