const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  username: String,
  grids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grid'}],
  firstName: String,
  lastName: String,
  email: String
})

User.plugin(passportLocalMongoose)

User.methods.addGrid = function(id) {
  if (this.grids.indexOf(id) === -1 ){
    this.grids.push(id)
  }
  return this.save()
}

module.exports = mongoose.model('user',User)
