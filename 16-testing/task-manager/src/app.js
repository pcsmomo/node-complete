const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userAdminRouter = require('./routers/user-admin')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(userAdminRouter)
app.use(taskRouter)

module.exports = app
