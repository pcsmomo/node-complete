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

    // if (!file.originalname.endsWith('pdf')) {
    //   return cb(new Error('Please upload a PDF'))
    // }

    cb(undefined, true)

    // cb(new Error('File must be a PDF')) // error
    // cb(undefined, true) // accept
    // cb(undefined, false) // reject
  }
})

app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})
