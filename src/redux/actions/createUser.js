import { SET_USER } from '../../reducers/user';

const createUser = (email) => ({ type: SET_USER, payload: email });

export default createUser;
