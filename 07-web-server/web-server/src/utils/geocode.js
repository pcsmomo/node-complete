const request = require('request')
const { MAPBOX_KEY } = require('../config.js')

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_KEY}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
      return
    } else if (response.body.message) {
      callback(response.body.message, undefined)
      return
    } else if (response.body.features.length === 0) {
      callback('Unable to find location', undefined)
      return
    }

    const firstResult = response.body.features[0]
    const latitude = firstResult.center[1]
    const longitude = firstResult.center[0]
    const location = firstResult.place_name

    callback(undefined, {
      latitude,
      longitude,
      location
    })
  })
}

module.exports = geocode
