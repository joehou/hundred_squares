const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema({
  eventName: String,
  eventColor: String,
  eventFontColor: String,
  startBlock: Integer,
  endBlock: Integer
})

module.exports = mongoose.model('event',Event)
