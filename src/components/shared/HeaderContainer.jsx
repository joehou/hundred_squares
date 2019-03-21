import React,{Component} from 'react'
import {connect} from 'react-redux'

import {logUserOut} from '../../actions/authentication'
import {resetGrid} from '../../actions/index'
import Header from './Header'

class HeaderContainer extends Component {
  constructor(props){
    super(props);

    this.logUserOutFunction = this.logUserOutFunction.bind(this)
  }

  logUserOutFunction() {
    const {dispatch} = this.props
    dispatch(logUserOut())
  }

  render (){
    console.log('rendering headercontainer')
    const {authentication} =this.props
    return(
      <Header authentication = {authentication} logUserOutFunction={this.logUserOutFunction} />
    )
  }
}

export default connect()(HeaderContainer);
