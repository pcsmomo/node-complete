const pet = {
  name: 'Hal'
}

pet.toJSON = function () {
  // console.log(this)
  // return this
  return {}
}

console.log(JSON.stringify(pet))
