import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'
import Modal from 'react-modal'
import {Container, Row, Col } from 'reactstrap'

import * as actions from '../../actions'



class Blocks extends Component {
  constructor(props){
    super(props)
      this.state = {
      eventModalOpen: false,
      eventEditModalOpen: false,
      startHighlightedCell: null,
      endHighlightedCell: null
      }
  }

  componentWillMount() {
    console.log('blocks component will mount')
    Modal.setAppElement('body')
  }


  convertMinsToHrsMins(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ?  h : h;
    m = m < 10 ?  m : m;
    return h + 'h ' + m+'m';
  }

  getInitials(string){
    var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  blocksMouseOut() {
    document.querySelectorAll('table td').forEach( block => {
      if (block.style.backgroundColor == 'lightblue'){
        block.style.backgroundColor = 'white'
      }
    })
  }

  blockHover(selectedBlock){
    document.querySelectorAll('table td').forEach( block => {
      if (block.id <= selectedBlock.id && block.childNodes.length == 0 )
      {
        block.style.backgroundColor = "lightblue"
      }
    })
  }

  blockClicked(selectedBlock){
    let startBlock=this.props.grid.events.reduce(function(prev, curr) {
      return prev.endBlock > curr.endBlock? prev : curr;
    }).endBlock
    this.setState( _=> ({
        startHighlightedCell: startBlock,
        endHighlightedCell: selectedBlock.id,
        eventModalOpen: true
      }),_=>{
      if (selectedBlock.eventID ==null){
        this.props.setEditEvent(startBlock,selectedBlock.id)
      }else{
        this.props.getEditEvent(selectedBlock.eventID)
      }
      }
    )

  }

  handleCloseModal () {
    this.setState(_=>({eventModalOpen:false,eventEditModalOpen:false,startHighlightedCell:null,endHighlightedCell:null}));
  }

  componentDidMount() {
    this.props.resetEditEvent()

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
  renderEventBlock(event,block){
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
    renderEventLength(){
      let blocks
      if( this.props.currentEvent && this.props.currentEvent._id ==null ){
        blocks =this.state.endHighlightedCell-this.state.startHighlightedCell
      return(
        <p>{blocks} Blocks = {this.convertMinsToHrsMins( (blocks)*10) } </p>
      )}else{
        blocks=this.props.currentEvent.endBlock-this.props.currentEvent.startBlock+1
        return(
          <p>{blocks} Blocks  = {this.convertMinsToHrsMins( (blocks)*10) } </p>
        )
      }
    }

  render() {
    let blocks=this.props.blocksAll
    const size= Array.from(new Array(10), (x,i) => i)
    return !this.props.blocksAll || this.props.blocksAll.length==0 ? (
      <div>Loading</div>
    ):(
      <div id="grid">
        <div className="row justify-content-center">
          <h1 className="gridName">{this.props.grid.gridName}</h1>
        </div>
        <div className="row justify-content-center">
        <table
          id="table"
          onMouseOut = { _=> this.blocksMouseOut() }
        >
          <tbody>
          {size.map((row,r)=>
            <tr key={r}>
              {size.map( (col,c)=>{
                var block=blocks[r*10+c]
                return(
                  <td id={block.id}
                      className={block.id >= this.state.startHighlightedCell && block.id <= this.state.endHighlightedCell? "selected":""}
                      onClick={_=>this.blockClicked(block)}
                      onMouseOver= {_=> this.blockHover(block)}
                      key={block.id}
                  >
                    {this.props.grid.events.map( event=>{
                        return (this.renderEventBlock(event,block))
                      }
                    )}
                  </td>)
              })}
            </tr>
          )}
          </tbody>
        </table>
        <Modal
          appElement={document.getElementById('app')}
          className='modal-old'
          contentLabel='Modal'
          isOpen={this.state.eventModalOpen}
          onRequestClose={_=>this.handleCloseModal()}
          shouldCloseOnEsc={false}
          style={{
                    overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'
                  },
                  content: {
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                  }
                }}
        >
          <div>
            <h2>adding event</h2>
            {this.renderEventLength()}
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
                  { (this.props.currentEvent._id ==null)?(
                      <button type="submit" onClick={event=>{
                        event.preventDefault()
                        this.props.createEvent(this.props.currentEvent, this.props.authentication.username,this.props.grid._id)
                        this.handleCloseModal()
                      }}>
                        Create
                      </button>
                    ):(
                      <button type="submit" onClick={event=>{
                        event.preventDefault()
                        this.props.updateEvent(this.props.currentEvent, this.props.authentication.username,this.props.grid._id)
                        this.handleCloseModal()
                      }}>
                        Update
                      </button>
                  )}
                  <button type="submit" onClick = {(event)=>{
                        event.preventDefault()
                        this.props.deleteEvent(this.props.currentEvent, this.props.authentication.username,this.props.grid._id)
                        this.handleCloseModal()
                  }}>
                  Delete</button>
                  <button type="cancel" onClick={event =>{
                    this.props.resetEditEvent()
                    this.handleCloseModal()
                  }}>
                    Cancel
                  </button>
                </form>
              )
            }

          </div>
        </Modal>
      </div>
    </div>
    )

  }
}

function mapStateToProps({authentication, events,blocks}){
  return {
    authentication: authentication,
    currentEvent: events.editEvent
  }
}

export default withRouter(connect(mapStateToProps,actions)(Blocks))
