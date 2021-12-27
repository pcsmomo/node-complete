require('../src/db/mongoose')
const Task = require('../src/models/task')

// 1. Promise Chaining way
// Task.countDocuments({ completed: false })
//   .then((result) => {
//     console.log(result)
//     return Task.findByIdAndDelete('61c8f3411ece53884a5b78fc')
//   })
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   })
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

// 2. Async / Await way
const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('61c8f33d1ece53884a5b78fa')
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
