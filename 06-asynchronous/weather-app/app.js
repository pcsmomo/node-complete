const request = require('request')
const chalk = require('chalk')
const { WEATHERSTACK_KEY, MAPBOX_KEY } = require('./config.js')

// let weatherQuery = 'melbourne' // this can be lat,lng or city
let geocode = '-37.8142,144.9632' // this can be lat,lng or city
const city = 'melbourne'
// const city = '12alxkvjacwhat'  // wrong location
// const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${city}`
const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${geocode}`
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${MAPBOX_KEY}`

// request({ url: url }, (error, response) => {
//   // console.log(response)
//   const data = JSON.parse(response.body)
//   console.log(data.current)
// })

// Weather
// Using json option
request({ url: weatherURL, json: true }, (error, response) => {
  if (error) {
    console.log(chalk.red('Unable to connect to weather service!'))
    console.log(`errno: ${error.errno}, code: ${error.code}, hostname: ${error.hostname} `)
    return
  } else if (response.body.error) {
    const resError = response.body.error
    console.log(chalk.red('Unable to find location'))
    console.log(`code: ${resError.code}, type: ${resError.type}, type: ${resError.info} `)
    return
  }

  // console.log(response.body.current)
  const { temperature, weather_descriptions } = response.body.current
  console.log(`${city} is currently ${weather_descriptions[0]} and it is ${temperature} degrees out.`)
})

// Geocoding
// Address -> Lat/Lng
request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log(chalk.red('Unable to connect to weather service!'))
    console.log(`errno: ${error.errno}, code: ${error.code}, hostname: ${error.hostname} `)
    return
  } else if (response.body.message) {
    console.log(chalk.red('Unable to find location'))
    console.log(`message: ${response.body.message}`)
    return
  } else if (response.body.features.length === 0) {
    console.log(chalk.red('Unable to find location'))
    return
  }

  // we will get 5 list from my query 'melbourne'
  // the first result is the most relative
  const firstResult = response.body.features[0]
  const latitude = firstResult.center[1]
  const longitude = firstResult.center[0]
  console.log(latitude, longitude)
})
