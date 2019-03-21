import React, {Component} from 'react'
import {connect} from 'react-redux'
import Blocks from '../blocks/Blocks'

class StarterGridContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Blocks />
    )
  }

}

export default connect()(StarterGridContainer)
