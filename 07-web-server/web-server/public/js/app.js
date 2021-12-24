console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')

const fetchWeather = (address) => {
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = data.error
        return
      }

      console.log(data.location)
      console.log(data.weatherData)
      messageOne.textContent = data.location
      weatherIcon.src = data.weatherIcon
      messageTwo.textContent = data.weatherData
    })
  })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  console.log(location)
  fetchWeather(location)
})
