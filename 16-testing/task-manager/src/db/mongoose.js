const mongoose = require('mongoose')

// const mongoUrl = '127.0.0.1:27017'
// const databaseName = 'task-mananger-api'

// it worked before deployment
// mongoose.connect(`mongodb://${process.env.MONGO_URL}/${process.env.DATABASE_NAME}`, {})
mongoose
  .connect(`${process.env.MONGODB_URL}`, {
    // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => {
    console.log('database is connected via mongoose...')
  })
