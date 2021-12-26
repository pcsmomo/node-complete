const mongoose = require('mongoose')

const mongoUrl = '127.0.0.1:27017'
const databaseName = 'task-mananger-api'

mongoose
  .connect(`mongodb://${mongoUrl}/${databaseName}`, {
    // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
    // useNewUrlParser: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log('database is connected via mongoose...')
  })

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// Create a new task
// const task = new Task({
//   description: '   Vacuum the floor   '
//   // completed: false
// })

// task
//   .save()
//   .then(() => {
//     console.log(task)
//   })
//   .catch((error) => {
//     console.log('Error!', error)
//   })
