require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('61c8f04dbf99912851681cd1', {
  age: 30
})
  .then((user) => {
    console.log(user)
    return User.countDocuments({ age: 30 })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })
