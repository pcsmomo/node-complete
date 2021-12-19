const request = require('request')
const chalk = require('chalk')
const { WEATHERSTACK_KEY } = require('./config.js')
const geocode = require('./utils/geocode')

// let weatherQuery = 'melbourne' // this can be lat,lng or city
let location = '-37.8142,144.9632'
const city = 'melbourne'
// const city = '12alxkvjacwhat'  // wrong location
// const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${city}`
const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${location}`

// request({ url: url }, (error, response) => {
//   // console.log(response)
//   const data = JSON.parse(response.body)
//   console.log(data.current)
// })

// Weather
// Using json option
// request({ url: weatherURL, json: true }, (error, response) => {
//   if (error) {
//     console.log(chalk.red('Unable to connect to weather service!'))
//     console.log(`errno: ${error.errno}, code: ${error.code}, hostname: ${error.hostname} `)
//     return
//   } else if (response.body.error) {
//     const resError = response.body.error
//     console.log(chalk.red('Unable to find location'))
//     console.log(`code: ${resError.code}, type: ${resError.type}, type: ${resError.info} `)
//     return
//   }

//   // console.log(response.body.current)
//   const { temperature, weather_descriptions } = response.body.current
//   console.log(`${city} is currently ${weather_descriptions[0]} and it is ${temperature} degrees out.`)
// })

geocode('Melbourne', (error, data) => {
  console.log('Error', error)
  console.log('Data', data)
})
