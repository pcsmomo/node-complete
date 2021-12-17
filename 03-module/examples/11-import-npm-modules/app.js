const validator = require('validator')

console.log(validator.isEmail('noah@example.com'))
console.log(validator.isEmail('example.com'))
console.log(validator.isURL('https://mead.io'))
console.log(validator.isURL('https//mead.io'))
