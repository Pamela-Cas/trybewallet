import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import createUser from '../redux/actions/createUser';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonIsDisabled: true,
  };

  handleChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value,
    }), () => this.validateForm());
  };

  validateForm = () => {
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const validateEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 6;
    const { email, password } = this.state;

    const isValid = validateEmail.test(email) && password.length >= MIN_LENGTH;

    this.setState({
      buttonIsDisabled: !isValid,
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { setUser, history } = this.props;
    setUser(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonIsDisabled } = this.state;
    return (
      <form>
        <input
          onChange={ this.handleChange }
          value={ email }
          name="email"
          type="email"
          data-testid="email-input"
        />
        <input
          onChange={ this.handleChange }
          value={ password }
          name="password"
          type="password"
          data-testid="password-input"
        />
        <button
          disabled={ buttonIsDisabled }
          type="button"
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUser: (email) => dispatch(createUser(email)),
});

Login.propTypes = {
  setUser: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
