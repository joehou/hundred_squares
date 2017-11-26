import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'

import * as actions from '../actions'



class Blocks extends Component {


  getInitials(string){
    var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  selectTo(selectedBlocks){
    var blocks=this.props.blocksAll
    blocks.forEach( block => {
      if ((block.row < selectedBlocks.row)||
        (block.col<selectedBlocks.col+1 && block.row== selectedBlocks.row)
      ){
        block.className="selected"
      }
    })
  }

  addOnClickEvents(){
    var blocks=document.querySelectorAll("td")
    console.log(blocks)
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
    this.addOnClickEvents()
  }

  renderEvent(event){
    return(
      <p className="event-icon"
        style={{backgroundColor:event.eventColor,color:event.eventFontColor}}>
        {event.eventName.slice(0,2)}
      </p>
    )
  }

  render() {
    console.log(this.props.events)
    let blocks=this.props.blocksAll
    const size= Array.from(new Array(10), (x,i) => i)
    return !this.props.blocksAll || this.props.blocksAll.length==0 ? (
      <div>Loading</div>
    ):(
      <div>
        <table id="table">
          <tbody>
          {size.map((row,r)=>
            <tr key={r}>
              {size.map( (col,c)=>{
                let block=blocks[r*10+c]
                return(
                  <td id={block.id}
                      className={block.selected? "selected":""}
                      onClick={_=>this.selectTo(block)}
                      key={block.id}
                  >
                    {this.props.events.map( event=>{
                        if (block.id >= event.startBlock && block.id<=event.endBlock)
                          return this.renderEvent(event)
                      }
                    )}
                  </td>)
              }
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
    events: Object.values(events.events),
    blocksAll: blocks.blocks
  }
}

export default withRouter(connect(mapStateToProps,actions)(Blocks))