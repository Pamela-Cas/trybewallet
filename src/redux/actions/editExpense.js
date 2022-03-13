import { EDIT_EXPENSE } from '../../reducers/wallet';

const editExpenseAction = (id, updates) => ({ type: EDIT_EXPENSE, id, payload: updates });

export default editExpenseAction;
