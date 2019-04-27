import React, {Component} from 'react'


class DashboardContainer extends Component {
 constructor(props){
   super(props)
 }

  render(){
    const {authentication} = this.props
    return(
      <div>
        <h2>My dash</h2>
      </div>
    )
  }
}

export default DashboardContainer
