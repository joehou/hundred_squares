const {mongoose, databaseUrl, options }  = require('../database')

const connectDatabase = async () => {
  await mongoose.connect(databaseUrl)
}

const disconnectDatabase = async () => {
  await mongoose.disconnect()
}

module.exports = {
  connectDatabase,
  disconnectDatabase
}
