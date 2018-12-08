import React,{Component} from 'react';
import { connect } from 'react-redux';

import Template from './Template'
import ErrorBox from './Shared/ErrorBoxContainer'

class TemplateContainer extends Component{
  constructor(props) {
    super(props);
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
