const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('combined'))

app.post('/users', (req, res) => {
  console.log(req.body)
  res.send('testing!')
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
