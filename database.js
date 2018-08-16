const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const env = process.env.NODE_ENV || 'development'
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/hundredsquares'
const options = {
  userMongoClient: true
}

module.exports =  {
  mongoose,
  databaseUrl,
  options
}
