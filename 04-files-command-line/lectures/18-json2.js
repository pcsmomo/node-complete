import fs from 'fs'

// Second example
const dataBuffer = fs.readFileSync('18-json2.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = 'Gunther'
user.age = 54

const userJSON = JSON.stringify(user)
fs.writeFileSync('./18-json2.json', userJSON)
