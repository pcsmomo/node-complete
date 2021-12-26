const mongoose = require('mongoose')

const mongoUrl = '127.0.0.1:27017'
const databaseName = 'task-mananger-api'

mongoose
  .connect(`mongodb://${mongoUrl}/${databaseName}`, {
    // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log('database is connected via mongoose...')
  })
