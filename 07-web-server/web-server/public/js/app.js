console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchWeather = (address) => {
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = data.error
        return
      }

      console.log(data.location)
      console.log(data.forecast)
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  console.log(location)
  fetchWeather(location)
})
