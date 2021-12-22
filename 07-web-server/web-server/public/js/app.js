console.log('Client side javascript file is loaded')

fetch('http://localhost:3000/weather?address=melbourne').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
      return
    }

    console.log(data.location)
    console.log(data.forecast)
  })
})
