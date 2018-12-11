import React, {Component}from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logUserIn, logUserOut} from '../../actions/authentication';

import LoginPage from './LoginPage';


class LoginPageContainer extends Component {
  constructor(props){
    super(props)

    this.logUserInFunction = this.logUserInFunction.bind(this)
    this.logUserOutFunction = this.logUserOutFunction.bind(this)
  }

  logUserInFunction(userData) {
    const { dispatch } = this.props;
    dispatch(logUserIn(userData));
  }

  logUserOutFunction() {
    const {dispatch} = this.props
    dispatch(logUserOut)
  }

  render(){
    const { authentication } = this.props;

    if (authentication.isLoggedIn ) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <LoginPage loginFunction={this.logUserInFunction} logoutFunction={this.logUserOutFunction} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps)(LoginPageContainer)
