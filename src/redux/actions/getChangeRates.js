import { GET_CHANGE_RATES } from '../../reducers/wallet';

const getChangeRates = (json) => ({ type: GET_CHANGE_RATES, payload: json });

const fetchChangeRates = () => (dispatch) => {
  dispatch(getChangeRates());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getChangeRates(json)));
};

export default fetchChangeRates;
