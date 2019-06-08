import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Blocks from  '../blocks/Blocks'
import * as actions from '../../actions'

class DashboardContainer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.resetEditEvent()
    if (this.props.authentication.isLoggedIn){
      this.props.reloadUserEvents(this.props.authentication.username)
    }
  }

  renderBlocks(){
    return (
        <Blocks grid= {this.props.grid} events = {this.props.events} blocksAll={this.props.blocksAll} />
    )
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
        { this.props.grid && this.props.grid.events.length >0 ? this.renderBlocks(this.props.grid.events, this.props.blocksAll) : <p>Not logged in</p>}
      </div>
    )
  }
}

function mapStateToProps({events,blocks,authenticaion}){  return {
    grid:events.grid,
    blocksAll: events.blocks
}
}
export default connect(mapStateToProps,actions)(DashboardContainer)
