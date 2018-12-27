const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema({
  eventName: { type: String, default: 'My first event'},
  eventColor: { type: String, default: 'LightPink'},
  eventFontColor: { type: String, default: 'Black'},
  startBlock: { type: Number, default: 0},
  endBlock: { type: Number, default: 7}
})

module.exports = Event
//module.exports = mongoose.model('event',Event)
