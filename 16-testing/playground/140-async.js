const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be non-negative')
      }

      // console.log('this code wont run')
      resolve(a + b)
    }, 2000)
  })
}

module.exports = {
  add
}
