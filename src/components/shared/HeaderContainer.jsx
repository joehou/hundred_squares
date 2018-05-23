import React,{Component} from 'react'
import {connect} from 'react-redux'

import Header from './Header'

class HeaderContainer extends Component {
  constructor(props){
    super(props);
  }

  render (){
    return(
      <Header />
    )
  }
}

export default connect()(HeaderContainer);
