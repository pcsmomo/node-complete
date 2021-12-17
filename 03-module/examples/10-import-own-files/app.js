const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is Noah.')
fs.appendFileSync('notes.txt', '\nAnd this is appended text.')

const add = require('./utils.js')

// const name = 'Noah'

console.log(add(4, 5))
// console.log(utils.name)
