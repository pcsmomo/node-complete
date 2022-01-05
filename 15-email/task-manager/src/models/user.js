const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number')
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
)

// Vertual Property
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// .methods. Instance Methods for individual instance
// way 1. basic way to get public profile
// userSchema.methods.getPublicProfile = function () {
// way 2 to get public profile using toJSON()
userSchema.methods.toJSON = function () {
  const user = this

  // Converts this document into a plain-old JavaScript object (POJO).
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

// No arrow function. It needs to be bound
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  // user.tokens = user.tokens.push({ token })  // it doesn't work
  await user.save()

  return token
}

// .statics. : Model Methods for upper case User model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
// Must use a stand function to bind, not an arrow function
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this

  await Task.deleteMany({ owner: user._id })

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

// Create a new user
// const me = new User({
//   name: '  Noah ',
//   email: 'noah@gmail.com    ',
//   password: '    11ord1dd    '
// })

// me.save()
//   .then(() => {
//     console.log(me)
//   })
//   .catch((error) => {
//     console.log('Error!', error)
//   })
