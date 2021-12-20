const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Melbourne', (error, data) => {
  console.log('Error', error)
  console.log('Data', data)
})

forecast(-37.8142, 144.9632, (error, data) => {
  console.log('Error', error)
  console.log('Data', data)
})
