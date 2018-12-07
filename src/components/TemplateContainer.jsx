import React,{Component} from 'react';
import { connect } from 'react-redux';

import Template from './Template'
import ErrorBox from './Shared/ErrorBoxContainer'

class TemplateContainer extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Template />
    );
  }
}


export default connect()(TemplateContainer);
