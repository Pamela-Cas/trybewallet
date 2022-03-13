import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import createExpenseAction from '../../redux/actions/addExpense';
import fetchChangeRatesAction from '../../redux/actions/getChangeRates';
import setCurrenciesAction from '../../redux/actions/setCurrencies';
import editExpenseAction from '../../redux/actions/editExpense';

import Table from '../Table';
import ExpenseForm from '../ExpenseForm';

class ExpenseFormAndTable extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
    btnTitle: 'Adicionar despesa',
    isEdit: false,
    id: '',
  }

  componentDidMount = async () => {
    const { getChangeRates, setCurrencies } = this.props;
    const currencies = (await getChangeRates()).payload;
    setCurrencies(Object.keys(currencies));
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  handleAddExpense = async () => {
    const { setExpense, expenses, getChangeRates } = this.props;

    const currencies = (await getChangeRates()).payload;
    this.setState(() => ({ exchangeRates: currencies }));

    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;

    const dataExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    setExpense(dataExpense);

    this.setState(() => (
      { value: '', description: '' }));
  };

  handleEditExpense = () => {
    const { editExpense } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    } = this.state;

    const dataExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    editExpense(id, dataExpense);
    this.setState(() => (
      { value: '', description: '', btnTitle: 'Adicionar despesa', isEdit: false }
    ));
  };

  handleAddOrEdit = async () => {
    const { isEdit } = this.state;

    if (isEdit) {
      this.handleEditExpense();
    } else {
      this.handleAddExpense();
    }
  };

  btnEditInTable = (expense) => {
    this.setState(() => ({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      btnTitle: 'Editar despesa',
      exchangeRates: expense.exchangeRates,
      isEdit: true,
      id: expense.id,
    }));
  };

  render() {
    return (
      <div>
        <ExpenseForm
          { ...this.state }
          handleChange={ this.handleChange }
          handleAddOrEdit={ this.handleAddOrEdit }
        />
        <Table handleEdit={ this.btnEditInTable } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(createExpenseAction(expense)),
  getChangeRates: () => dispatch(fetchChangeRatesAction()),
  setCurrencies: (currencies) => dispatch(setCurrenciesAction(currencies)),
  editExpense: (id, updates) => dispatch(editExpenseAction(id, updates)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

ExpenseFormAndTable.propTypes = {
  setExpense: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  getChangeRates: propTypes.func.isRequired,
  setCurrencies: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  editExpense: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormAndTable);
