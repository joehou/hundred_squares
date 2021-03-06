import React,{Component} from 'react';
import { connect } from 'react-redux';

import { checkSession } from '../actions/authentication';
import Template from './Template'
import ErrorBox from './shared/ErrorBoxContainer'

class TemplateContainer extends Component{
  constructor(props) {
    super(props);
    this.checkUserSession = this.checkUserSession.bind(this)
  }

  componentWillMount() {
    // Before the component mounts, check for an existing user session
       this.checkUserSession();

  }

  checkUserSession(){
    const {dispatch} = this.props
    dispatch(checkSession());
  }


  render(){
    const {authentication} = this.props

    return (
      <Template authentication={authentication}/>
    );
  }
}

function mapStateToProps(state) {
  return{
    authentication: state.authentication
  }
}

export default connect(mapStateToProps)(TemplateContainer);
