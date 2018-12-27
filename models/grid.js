const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EventSchema = require('./event')

const Grid = new Schema( {
  gridName: String, 
  description: String,
  events: [EventSchema]
})

module.exports = mongoose.model('grid',Grid)
