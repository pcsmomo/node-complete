// 1. Task Model
const Task = mongoose.model('Task', {
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // user._id
  }
})

// 2. User Model
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})
