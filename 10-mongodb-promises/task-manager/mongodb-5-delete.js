// CURD create read update delete

const { MongoClient, ObjectId } = require('mongodb')

// mongodb://localhost:27017 had some issue somehow..
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-mananger'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  console.log('Connected correctly!')

  const db = client.db(databaseName)

  // 1. deleteMany()
  // db.collection('users')
  //   .deleteMany({
  //     age: 27
  //   })
  //   .then((result) => {
  //     console.log(result)
  //     console.log(result.deletedCount)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // 2. deleteOne()
  db.collection('tasks')
    .deleteOne({
      description: 'Renew inspection'
    })
    .then((result) => {
      console.log(result)
      console.log(result.deletedCount)
    })
    .catch((error) => {
      console.log(error)
    })
})
