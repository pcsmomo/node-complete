const socket = io()

// Element
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
  console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // disable
  $messageFormButton.setAttribute('disabled', 'disabled')

  // const message = document.querySelector('input').value
  const message = e.target.elements.message.value // Using form and name

  socket.emit('sendMessage', message, (error) => {
    // enable
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if (error) {
      return console.log(error)
    }

    console.log('Message delivered!')
  })
})

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  $sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position)
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        $sendLocationButton.removeAttribute('disabled')
        console.log('Location shared!')
      }
    )
  })
})
