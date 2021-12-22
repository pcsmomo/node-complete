const path = require('path')
const express = require('express')
const hbs = require('hbs')

const winston = require('winston')
const { combine, timestamp, label, prettyPrint } = winston.format

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

/**************/
// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Noah Kim'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Noah Kim'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is a help text',
    title: 'Help',
    name: 'Noah Kim'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Noah Kim',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Noah Kim',
    errorMessage: 'Page not found'
  })
})

/**************/
// Logging
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

logger.info({
  message: 'Use a helper method if you want',
  additional: 'properties',
  are: 'passed along'
})

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
