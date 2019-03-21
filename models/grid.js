const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EventSchema = require('./event')

const Grid = new Schema( {
  gridName: { type: String}, 
  description: { type: String},
  events: [{type: EventSchema}]
})

//use pre save hook to load "My Starter Event"
Grid.pre("save", function(next){
  if (!this.events || this.events.length === 0 ){
    this.events = []
    this.events.push({
      eventName: 'My First Event',
      eventColor: 'LightPink',
      eventFontColor: 'Black',
      startBlock: 0,
      endBlock: 7
    })
  }
  next()
})

module.exports = mongoose.model('grid',Grid)
