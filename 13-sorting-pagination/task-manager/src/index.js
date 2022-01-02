const express = require('express')
const morgan = require('morgan')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userAdminRouter = require('./routers/user-admin')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// with middleware:    new request -> do something -> run route handler
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(morgan('combined'))
app.use(userRouter)
app.use(userAdminRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

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

mainUser()
