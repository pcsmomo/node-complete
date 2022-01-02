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
