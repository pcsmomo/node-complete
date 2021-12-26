require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.countDocuments({ completed: false })
  .then((result) => {
    console.log(result)
    return Task.findByIdAndDelete('61c8f3411ece53884a5b78fc')
  })
  .then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })
