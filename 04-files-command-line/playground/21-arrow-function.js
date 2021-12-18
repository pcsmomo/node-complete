// const square = function (x) {
//   return x * x
// }

// const square = (x) => {
//   return x * x
// }

const square = (x) => x * x

console.log(square(3))

// const eventObj = {
//   name: 'Birthday Party',
//   printGuestList: function () {
//     console.log('Guest list for ' + this.name)
//   }
// }

// Arrow function
// const eventObj = {
//   name: 'Birthday Party',
//   printGuestList: () => {
//     console.log('Guest list for ' + this.name)
//   }
// }

const eventObj = {
  name: 'Birthday Party',
  guestList: ['Noah', 'Jen', 'Mike'],
  printGuestList() {
    // const that = this
    console.log('Guest list for ' + this.name)
    // this.guestList.forEach(function (guest) {
    this.guestList.forEach((guest) => {
      console.log(guest + ' is attending ' + this.name)
    })
  }
}

eventObj.printGuestList()
