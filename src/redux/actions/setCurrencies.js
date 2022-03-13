import { SET_CURRENCIES } from '../../reducers/wallet';

const setCurrencies = (currencies) => ({ type: SET_CURRENCIES, payload: currencies });

export default setCurrencies;
