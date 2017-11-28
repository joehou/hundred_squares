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
    let startBlock=this.props.events.reduce(function(prev, curr) {
      return prev.endBlock > curr.endBlock? prev : curr;
    }).endBlock
    this.setState( _=> ({
        startHighlightedCell: startBlock,
        endHighlightedCell: selectedBlock.id,
        eventModalOpen: selectedBlock.eventID ==null? true: false,
        eventEditModalOpen: selectedBlock.eventID !=null ? true: false
      }),
      _=> this.props.setEditEvent(startBlock,selectedBlock.id)
    )
  }

  handleCloseModal () {
    this.setState(_=>({eventModalOpen:false,eventEditModalOpen:false,startHighlightedCell:null,endHighlightedCell:null}));
  }

  componentDidMount() {
    this.props.resetEditEvent()
    this.props.loadEvents()
    this.props.loadBlocks()

  }

  renderEvent(event){
    return(
      <p className="event-icon"
        style={{backgroundColor:event.eventColor,color:event.eventFontColor}}>
      </p>
    )
  }
  renderEventStart(event){
    return(
      <p className="event-icon"
         style={{backgroundColor:event.eventColor,color:event.eventFontColor,lineHeight:"80px"
         }}>
        {event.eventName} - 50m
      </p>
    )
  }
  renderEventSingle(event){
    return(
      <p className="event-icon"
         style={{backgroundColor:event.eventColor,color:event.eventFontColor,whiteSpace:"normal"}}>
        {event.eventName}
      </p>
    )
  }
  renderEventEnd(event){
    return(
      <p className="event-icon"
         style={{backgroundColor:event.eventColor,color:event.eventFontColor}}>
        10m
      </p>
    )
  }

  render() {
    let blocks=this.props.blocksAll
    const size= Array.from(new Array(10), (x,i) => i)
    return !this.props.blocksAll || this.props.blocksAll.length==0 ? (
      <div>Loading</div>
    ):(
      <div>
        <Modal
          className='modal'
          contentLabel='Modal'
          isOpen={this.state.eventModalOpen}
          onRequestClose={_=>this.handleCloseModal()}
        >
          <div>
            <h2>adding event</h2>
            <p>{this.state.endHighlightedCell-this.state.startHighlightedCell} Blocks = {(this.state.endHighlightedCell-this.state.startHighlightedCell) *10} Minutes </p>
            {!this.props.currentEvent ?
              (
                <div> Loading event</div>
              ):(
                <form onChange={event=>this.props.updateEditEvent({propertyName: event.target.name, value: event.target.value})}>
                  <label>Activity: </label>
                  <input name="eventName" type = "text" value={this.props.currentEvent.eventName} />
                  <br />
                  <label>Block Color:</label>
                  <input name="eventColor" type="text" value={this.props.currentEvent.eventColor} />
                  <br />
                  <label>Font Color:</label>
                  <input name="eventFontColor" type="text" value={this.props.currentEvent.eventFontColor} />
                  {this.props.currentEvent.startBlock}, {this.props.currentEvent.endBlock}
                  <br />
                  <button type="submit" onClick={event=>{
                    event.preventDefault()
                    this.props.createEvent(this.props.currentEvent)
                    this.handleCloseModal()
                  }}>
                    Save
                  </button>
                </form>
              )
            }

          </div>
        </Modal>
        <Modal
          className='modal'
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
                        if (block.id == event.startBlock && event.endBlock ==event.startBlock)
                          return (
                            <div className="one-cell-event">
                              {this.renderEventSingle(event)}
                            </div>
                           )
                        else if (block.id == event.startBlock && event.endBlock ==event.startBlock+1)
                          return (
                            <div className="two-cell-event">
                              {this.renderEventSingle(event)}
                            </div>
                          )
                        else if (block.id == event.endBlock && event.endBlock ==event.startBlock+1)
                          return (
                            <div className="two-cell-event">
                              {this.renderEventEnd(event)}
                            </div>
                          )
                        else if (block.id == event.startBlock && event.endBlock >event.startBlock+1)
                          return (
                            <div className="multi-cell-event">
                              {this.renderEventStart(event)}
                            </div>
                          )
                        else if (block.id >= event.startBlock && block.id<=event.endBlock)
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
    events: events.events,
    currentEvent: events.editEvent,
    blocksAll: events.blocks
  }
}

export default withRouter(connect(mapStateToProps,actions)(Blocks))