import React,{Component} from 'react'
import {connect} from 'react-redux'
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

  componentDidMount() {
    this.props.loadEvents()
    let isMouseDown = false;
    let startRowIndex= null;
    let startCellIndex = null;
    // document.querySelectorAll("td").forEach( square => {square.addEventListener("mousedown",event=> console.log(event) )})
    var blocks=document.querySelectorAll("td")
    // blocks.forEach( block =>{
    //   block.addEventListener("mousedown",event => {
    //     let block=event.target
    //     isMouseDown=true
    //     let coords=this.getCoordinates(block)
    //     this.selectTo(block)
    //   })
    // })

  }

  render() {
    const rows= Array.from(new Array(10), (x,i) => i)
    const columns = Array.from(new Array(10), (x,i) => i)

    return(
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
    )
  }
}

function mapStateToProps({events}){
  events: events
}

export default connect(mapStateToProps,actions)(Blocks)