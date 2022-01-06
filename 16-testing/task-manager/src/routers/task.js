const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {}
  const sort = {
    // createdAt: 1 // ascending
    // createdAt: -1 // descending
  }

  const { completed, sortBy } = req.query

  if (completed) {
    match.completed = completed === 'true'
  }

  if (sortBy) {
    const parts = sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    // const tasks = await Task.find({})  // all tasks

    // Way 1
    // const tasks = await Task.find({ owner: req.user._id })
    // const tasks = await Task.find({ owner: req.user._id, ...match })
    // res.send(tasks)

    // Way 2
    // await req.user.populate('tasks')
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: req.query.limit && parseInt(req.query.limit),
        skip: req.query.skip && parseInt(req.query.skip),
        sort
      }
    })
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    // const task = await Task.findById(req.params.id)
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    Object.assign(task, req.body)
    // updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    // This won't get handled by 'save' middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      res.status(404).send()
    }

    task.delete()

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
