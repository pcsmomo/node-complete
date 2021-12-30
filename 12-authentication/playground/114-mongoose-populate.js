const Task = require('./models/task')
const User = require('./models/user')

const mainTask = async () => {
  const task = await Task.findById('61cd4fe0f31b0e2675e05d42')
  // await task.populate('owner').execPopulate() // Old syntax
  await task.populate('owner')
  console.log(task.owner)
}

const mainUser = async () => {
  const user = await User.findById('61ccd8c91cdd283eba56ac02')
  await user.populate('tasks')
  console.log(user.tasks)
}

mainTask()
mainUser()
