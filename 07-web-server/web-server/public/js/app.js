console.log('Client side javascript file is loaded')

const fetchWeather = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        return
      }

      console.log(data.location)
      console.log(data.forecast)
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('form')
  const search = document.querySelector('input')

  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    console.log(location)
    fetchWeather(location)
  })
})
