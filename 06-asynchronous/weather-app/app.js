const request = require('request')
const { WEATHERSTACK_KEY } = require('./config.js')

const city = 'melbourne'
const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${city}`

// request({ url: url }, (error, response) => {
//   // console.log(response)
//   const data = JSON.parse(response.body)
//   console.log(data.current)
// })

// Using json option
request({ url: url, json: true }, (error, response) => {
  // console.log(response.body.current)
  const { temperature, weather_descriptions } = response.body.current
  console.log(`${city} is currently ${weather_descriptions[0]} and it is ${temperature} degrees out.`)
})

// Data example
// {
//   "request": {
//     "type": "City",
//     "query": "Melbourne, Australia",
//     "language": "en",
//     "unit": "m"
//   },
//   "location": {
//     "name": "Melbourne",
//     "country": "Australia",
//     "region": "Victoria",
//     "lat": "-37.817",
//     "lon": "144.967",
//     "timezone_id": "Australia/Melbourne",
//     "localtime": "2021-12-19 09:21",
//     "localtime_epoch": 1639905660,
//     "utc_offset": "11.0"
//   },
//   "current": {
//     "observation_time": "10:21 PM",
//     "temperature": 20,
//     "weather_code": 116,
//     "weather_icons": [
//       "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
//     ],
//     "weather_descriptions": ["Partly cloudy"],
//     "wind_speed": 2,
//     "wind_degree": 30,
//     "wind_dir": "NNE",
//     "pressure": 1002,
//     "precip": 0,
//     "humidity": 83,
//     "cloudcover": 75,
//     "feelslike": 20,
//     "uv_index": 6,
//     "visibility": 10,
//     "is_day": "yes"
//   }
// }
