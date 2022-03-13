import { SET_EXPENSE } from '../../reducers/wallet';

const createExpense = (expense) => ({ type: SET_EXPENSE, payload: expense });

export default createExpense;
