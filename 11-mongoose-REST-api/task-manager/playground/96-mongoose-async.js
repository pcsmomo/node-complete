require('../src/db/mongoose')
const User = require('../src/models/user')

// 1. Promise Chaining way
// User.findByIdAndUpdate('61c8f04dbf99912851681cd1', {
//   age: 30
// })
//   .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 30 })
//   })
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

// 2. Async / Await way
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('61c8f04dbf99912851681cd1', 2)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
