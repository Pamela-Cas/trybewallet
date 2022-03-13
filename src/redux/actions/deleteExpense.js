import { DELETE_EXPENSE } from '../../reducers/wallet';

const deleteExpenseAction = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export default deleteExpenseAction;
