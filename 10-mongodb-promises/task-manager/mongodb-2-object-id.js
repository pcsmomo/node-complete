// CURD create read update delete

const { MongoClient, ObjectId } = require('mongodb')

// mongodb://localhost:27017 had some issue somehow..
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-mananger'

const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())
console.log(id.id)
console.log(id.id.length)
console.log(id.toString())
console.log(id.toHexString())
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  console.log('Connected correctly!')

  const db = client.db(databaseName)

  // Insert One with ObjectID
  // db.collection('users').insertOne(
  //   {
  //     _id: id,
  //     name: 'Scott',
  //     age: 32
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert user')
  //     }

  //     console.log(result)
  //   }
  // )
})
