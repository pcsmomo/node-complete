const express = require('express')
const multer = require('multer')

const app = express()

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000 // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)

    // cb(new Error('File must be a PDF')) // error
    // cb(undefined, true) // accept
    // cb(undefined, false) // reject
  }
})

app.post(
  '/upload',
  errorMiddleware,
  (req, res) => {
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

const errorMiddleware = (req, res, next) => {
  throw new Error('From my middleware')
}

app.get(
  '/error',
  errorMiddleware,
  (req, res) => {
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)
