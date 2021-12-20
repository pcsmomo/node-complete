const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// node app.js melbourne
// node app.js namhae
const address = process.argv[2]

if (!address) {
  console.log('Please provide address')
} else {
  // geocode(address, (error, data) => {
  geocode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return console.log(error)
    }

    // console.log('Data', data)
    // const { location, latitude, longitude } = data

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error)
      }

      console.log(location)
      console.log(forecastData)
    })
  })
}
