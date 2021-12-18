import fs from 'fs'

const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

// fs.writeFileSync('18-json.json', bookJSON)

const dataBuffer = fs.readFileSync('18-json.json')
console.log(dataBuffer)

const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.title)
