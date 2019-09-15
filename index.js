const mongoose = require('mongoose')
const util = require('util')

const config = require('./config/config')
const app = require('./config/express')

const debug = require('debug')('e-co:index')

// connect to mongo db
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

// listen on port config.port
app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
})

module.exports = app