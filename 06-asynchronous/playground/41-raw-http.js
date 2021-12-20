const http = require('http')
const { WEATHERSTACK_KEY } = require('./config.js')

const latitude = -37.8142
const longitude = 144.9632

const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${latitude},${longitude}`

const request = http.request(url, (response) => {
  let data = ''

  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

request.on('error', () => {
  console.log('An error', error)
})

request.end()
