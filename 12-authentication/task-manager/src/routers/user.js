const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const router = new express.Router()

// Create a user
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Log in
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user: user.getPublicProfile(), token })
  } catch (e) {
    res.status(400).send()
  }
})

// Log out
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// Log out all
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// Get users - we don't want to expose all user list
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

// Get my profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// Get a user
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    if (!user) {
      // in Mongoose 6.1.3, if the length of _id is not 24, it will throw an error
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

// Update a user
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      // if not return, the app will get crashed
      return res.status(404).send()
    }

    Object.assign(user, req.body)
    // updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    // This won't get handled by 'save' middleware
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
