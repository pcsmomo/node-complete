const express = require('express')
const winston = require('winston')
const { combine, timestamp, label, prettyPrint } = winston.format

const app = express()

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: combine(winston.format.splat(), winston.format.simple()),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
})

logger.log({
  level: 'info',
  message: 'Pass an object and this works',
  additional: 'properties',
  are: 'passed along'
})

logger.info({
  message: 'Use a helper method if you want',
  additional: 'properties',
  are: 'passed along'
})

app.get('', (req, res) => {
  res.send('Hello express!')
})

app.get('/help', (req, res) => {
  res.send('Help page')
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/weather', (req, res) => {
  res.send('Weather page')
})

// app.com
// app.com/help
// app.com/about

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

app.listen(3000, () => {
  console.log('Server is up on port', 3000)
})
