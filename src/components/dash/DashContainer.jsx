import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Blocks from  '../blocks/Blocks'
import * as actions from '../../actions'

class DashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
   // this.props.resetEditEvent()
   // this.props.reloadUserEvents(this.props.authentication.username)
  }
  render(){
    const {authentication} = this.props
    if (!authentication.isLoggedIn) {
      return(
        <Redirect to="/" />
      )
    }
    return(
      <div>
        <h2>My dash</h2>
      </div>
    )
  }
}

export default DashboardContainer
