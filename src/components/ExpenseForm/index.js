import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpenseForm extends Component {
  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      btnTitle,
      handleChange,
      handleAddOrEdit,
      currencies,
    } = this.props;
    const currencyOptions = currencies.filter((currencyItem) => currencyItem !== 'USDT');
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            onChange={ handleChange }
            value={ value }
            type="text"
            data-testid="value-input"
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            onChange={ handleChange }
            value={ description }
            type="text"
            data-testid="description-input"
            id="description"
          />
        </label>
        <label htmlFor="currency">
          moeda
          <select
            onChange={ handleChange }
            data-testid="currency-input"
            id="currency"
            value={ currency }
          >
            {
              currencyOptions.map((currencyItem) => (
                <option
                  data-testid={ currencyItem }
                  key={ currencyItem }
                  value={ currencyItem }
                >
                  {currencyItem}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento
          <select
            onChange={ handleChange }
            data-testid="method-input"
            id="method"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

        </label>

        <label htmlFor="tag">
          Método de pagamento
          <select
            onChange={ handleChange }
            data-testid="tag-input"
            id="tag"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          onClick={ handleAddOrEdit }
          type="button"
        >
          { btnTitle }
        </button>

      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
ExpenseForm.propTypes = {
  value: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  currency: propTypes.string.isRequired,
  method: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
  btnTitle: propTypes.string.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  handleChange: propTypes.func.isRequired,
  handleAddOrEdit: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpenseForm);
