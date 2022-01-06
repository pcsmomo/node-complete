const express = require('express')
const morgan = require('morgan')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userAdminRouter = require('./routers/user-admin')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(morgan('combined'))
app.use(userRouter)
app.use(userAdminRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
