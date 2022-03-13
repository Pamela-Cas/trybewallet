import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import deleteExpenseAction from '../../redux/actions/deleteExpense';

class Table extends Component {
  nameForCurrency(expense) {
    return expense.exchangeRates[expense.currency].name.split('/')[0];
  }

  handleDeleteExpense(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { expenses, handleEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ this.nameForCurrency(expense)}</td>
                <td>
                  {
                    parseFloat(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }

                </td>
                <td>
                  {
                    parseFloat(
                      expense.value * expense.exchangeRates[expense.currency].ask,
                    ).toFixed(2)
                  }

                </td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ () => handleEdit(expense) }
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    onClick={ () => this.handleDeleteExpense(expense.id) }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  deleteExpense: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
