import React from 'react';
import ExpenseFormAndTable from '../components/ExpenseFormAndTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseFormAndTable />
      </div>
    );
  }
}

export default Wallet;
