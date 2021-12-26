const mongoose = require('mongoose')

const mongoUrl = '127.0.0.1:27017'
const databaseName = 'task-mananger-api'

mongoose.connect(`mongodb://${mongoUrl}/${databaseName}`, {
  // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
  // useNewUrlParser: true,
  // useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

const me = new User({
  name: 'Noah',
  age: 30
})

me.save()
  .then(() => {
    console.log(me)
  })
  .catch((error) => {
    console.log('Error!', error)
  })

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const task = new Task({
  description: 'Learn the Mongoose library',
  completed: false
})

task
  .save()
  .then(() => {
    console.log(task)
  })
  .catch((error) => {
    console.log('Error!', error)
  })
