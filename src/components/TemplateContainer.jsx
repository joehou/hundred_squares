import React,{Component} from 'react';
import { connect } from 'react-redux';

import Template from './Template'

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
