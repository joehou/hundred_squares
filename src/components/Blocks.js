import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'

import * as actions from '../actions'



class Blocks extends Component {

  getCoordinates(tdElement){
    return {
      cellIndex: tdElement.cellIndex,
      rowIndex: tdElement.parentElement.rowIndex
    }
  }

  selectTo(selectedBlocks){
    var blocks=document.querySelectorAll("td")
    blocks.forEach( blocks => {
      let coords=this.getCoordinates(blocks)
      if ((coords.rowIndex < selectedBlocks.parentElement.rowIndex)||
        (coords.cellIndex<selectedBlocks.cellIndex+1 && coords.rowIndex == selectedBlocks.parentElement.rowIndex )
      ){
        blocks.className="selected"
      }
    })
  }

  adddOnClickEvents(){
    var blocks=document.querySelectorAll("td")
    blocks.forEach( block =>{
      block.addEventListener("mousedown",event => {
        let block=event.target
        let coords=this.getCoordinates(block)
        this.selectTo(block)
      })
    })
  }

  componentDidMount() {
    this.props.loadEvents()
    this.props.loadBlocks()
  }

  render() {
    const rows= Array.from(new Array(10), (x,i) => i)
    const columns = Array.from(new Array(10), (x,i) => i)
    console.log(this.props.blocksAll["0"])
    return(
      <div>
        <table id="table">
          <tbody>
          {rows.map((row,r)=>
            <tr key={r}>
              {columns.map( (column,c)=>
                <td id= {r*10+c} key={c}></td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps({events,blocks}){
  return {
    events: events,
    blocksAll: blocks.blocks
  }
}

export default withRouter(connect(mapStateToProps,actions)(Blocks))