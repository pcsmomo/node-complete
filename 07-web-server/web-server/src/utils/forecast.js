const request = require('request')
const { WEATHERSTACK_KEY } = require('../../config.js')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}`

  // Without json option
  // request({ url: url }, (error, response) => {
  //   const data = JSON.parse(response.body)
  //   console.log(data.current)
  // })

  // Using json option
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!')
      // console.log(`errno: ${error.errno}, code: ${error.code}, hostname: ${error.hostname} `)
      return
    } else if (response.body.error) {
      callback('Unable to find location')
      // const resError = response.body.error
      // console.log(`code: ${resError.code}, type: ${resError.type}, type: ${resError.info} `)
      return
    }

    const { temperature, weather_descriptions } = response.body.current

    callback(undefined, `${latitude}, ${longitude} is currently ${weather_descriptions[0]} and it is ${temperature} degrees out.`)
  })
}

module.exports = forecast
