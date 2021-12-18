const request = require('request')
const { WEATHERSTACK_KEY } = require('./config.js')

const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=melbourne`

request({ url: url }, (error, response) => {
  // console.log(response)
  const data = JSON.parse(response.body)
  console.log(data.current)
})
