const express = require('express')
const morgan = require('morgan')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userAdminRouter = require('./routers/user-admin')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
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
  upload.single('upload'),
  (req, res) => {
    res.send()
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

app.use(express.json())
app.use(morgan('combined'))
app.use(userRouter)
app.use(userAdminRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
