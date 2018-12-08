import React,{Component} from 'react'
import {connect} from 'react-redux'

import Header from './Header'

class HeaderContainer extends Component {
  constructor(props){
    super(props);
  }

  render (){
    const {authentication} =this.props
    return(
      <Header authentication = {authentication} />
    )
  }
}

export default connect()(HeaderContainer);
