const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // user._id
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

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
