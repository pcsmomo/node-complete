const request = require('request')
const { WEATHERSTACK_KEY, MAPBOX_KEY } = require('./config.js')

const city = 'melbourne'
const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${city}`
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${MAPBOX_KEY}`

// request({ url: url }, (error, response) => {
//   // console.log(response)
//   const data = JSON.parse(response.body)
//   console.log(data.current)
// })

// Weather
// Using json option
request({ url: weatherURL, json: true }, (error, response) => {
  // console.log(response.body.current)
  const { temperature, weather_descriptions } = response.body.current
  console.log(`${city} is currently ${weather_descriptions[0]} and it is ${temperature} degrees out.`)
})

// Geocoding
// Address -> Lat/Lng
request({ url: geocodeURL, json: true }, (error, response) => {
  // we will get 5 list from my query 'melbourne'
  // the first result is the most relative
  const firstResult = response.body.features[0]
  const latitude = firstResult.center[1]
  const longitude = firstResult.center[1]
  console.log(latitude, longitude)
})
