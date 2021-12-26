const mongoose = require('mongoose')
const validator = require('validator')

const mongoUrl = '127.0.0.1:27017'
const databaseName = 'task-mananger-api'

mongoose.connect(`mongodb://${mongoUrl}/${databaseName}`, {
  // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
  // useNewUrlParser: true,
  // useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

// const me = new User({
//   name: '  Noah ',
//   email: 'noah@gmail.com    ',
//   password: '    11ord1dd    '
// })

// me.save()
//   .then(() => {
//     console.log(me)
//   })
//   .catch((error) => {
//     console.log('Error!', error)
//   })

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

const task = new Task({
  description: '   Vacuum the floor   '
  // completed: false
})

task
  .save()
  .then(() => {
    console.log(task)
  })
  .catch((error) => {
    console.log('Error!', error)
  })
