const express = require('express')
const morgan = require('morgan')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectId } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('combined'))

app.post('/users', (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      res.status(201).send(user)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch((e) => {
      res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id

  console.log(_id)

  User.findById(_id)
    .then((user) => {
      if (!user) {
        // in Mongoose 6.1.3, if the length of _id is not 24, it will throw an error
        res.status(404).send()
      }

      res.send(user)
    })
    .catch((e) => {
      console.log('error?')
      res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task
    .save()
    .then(() => {
      res.status(201).send(task)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
