import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Jumbotron, Button} from 'reactstrap'
import * as actions from '../../actions'

import HomePage from './HomePage'
import Blocks from '../blocks/Blocks'

class HomePageContainer extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    if (!this.props.authentication.isLoggedIn)
    this.props.resetEditEvent()
    this.props.loadStarterGrid()
    this.props.loadBlocks()
  }

  renderBlocks(){
    return (
        <Blocks grid= {this.props.grid} events = {this.props.events} blocksAll={this.props.blocksAll} />
    )
  }

  render(){
    const { authentication } = this.props
     if (authentication.isLoggedIn) {
       return (
         <Redirect to="/dash" />
       );
     }
    return(
      <div>
        <Jumbotron>
          <h1 className="display-3">Hundred Blocks a Day</h1>
          <p className="lead">1000 minutes a day in 100 10 minute blocks</p>
          <hr className="my-2" />
          <p className="lead">Label groups of blocks by your daily activities to see how the precious 100 blocks of your day is being spent</p>
        </Jumbotron>
        Here we show starter grid for not logged in or rediret to a list of existing grids for current user
        { this.props.events && this.props.events.length >0 ? this.renderBlocks(this.props.events, this.props.blocksAll) : <p>Not logged in</p>}
       </div>
    )
  }
}

function mapStateToProps({events,blocks,authentication}){ return {
    grid: events.grid,
    events: events.events,
    blocksAll: events.blocks
  }
}

export default connect(mapStateToProps,actions)(HomePageContainer)
