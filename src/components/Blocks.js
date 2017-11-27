import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'
import Modal from 'react-modal'

import * as actions from '../actions'



class Blocks extends Component {
  state = {
    eventModalOpen: false,
    eventEditModalOpen: false,
    startHighlightedCell: null,
    endHighlightedCell: null
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


  getInitials(string){
    var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  selectTo(selectedBlocks){
    console.log(selectedBlocks)
    var blocks=this.props.blocksAll
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

  blockClicked(selectedBlock){
    console.log(selectedBlock)
    this.setState( _=> ({
        startHighlightedCell:this.props.events.reduce(function(prev, curr) {
          return prev.endBlock > curr.endBlock? prev : curr;
        }).endBlock,
        endHighlightedCell: selectedBlock.id,
        eventModalOpen: selectedBlock.eventID ==null? true: false,
        eventEditModalOpen: selectedBlock.eventID !=null ? true: false
      })
    )
  }

  handleCloseModal () {
    console.log("Closing me")
    this.setState(_=>({eventModalOpen:false,eventEditModalOpen:false,startHighlightedCell:null,endHighlightedCell:null}));
  }

  componentDidMount() {
    this.props.loadEvents()
    this.props.loadBlocks()
    // this.addOnClickEvents()
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
        <Modal
          className='modal'
          overlayClassName='overlay'
          contentLabel='Modal'
          isOpen={this.state.eventModalOpen}
          onRequestClose={_=>this.handleCloseModal()}
        >
          <div>
            <h2>adding event</h2>
            <p>{(this.state.endHighlightedCell-this.state.startHighlightedCell) *10} Minutes </p>
          </div>
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          contentLabel='Modal'
          isOpen={this.state.eventEditModalOpen}
          onRequestClose={_=>this.handleCloseModal()}
        >
          <div>
            <h2>Edit existing event</h2>
            <p>{this.state.startHighlightedCell},{this.state.endHighlightedCell} </p>
          </div>
        </Modal>
        <table id="table">
          <tbody>
          {size.map((row,r)=>
            <tr key={r}>
              {size.map( (col,c)=>{
                let block=blocks[r*10+c]
                return(
                  <td id={block.id}
                      className={block.id >= this.state.startHighlightedCell && block.id <= this.state.endHighlightedCell? "selected":""}
                      onClick={_=>this.blockClicked(block)}
                      key={block.id}
                  >
                    {this.props.events.map( event=>{
                        if (block.id >= event.startBlock && block.id<=event.endBlock)
                          return this.renderEvent(event)
                      }
                    )}
                  </td>)
              })}
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