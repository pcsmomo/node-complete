const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is Noah.')
fs.appendFileSync('notes.txt', '\nAnd this is appended text.')
