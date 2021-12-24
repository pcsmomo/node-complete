// CURD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// mongodb://localhost:27017 had some issue somehow..
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-mananger'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  console.log('Connected correctly!')

  const db = client.db(databaseName)

  // Insert One
  // db.collection('users').insertOne(
  //   {
  //     name: 'Noah',
  //     age: 30
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert user')
  //     }

  //     console.log(result)
  //   }
  // )

  // Insert Many
  // db.collection('users').insertMany(
  //   [
  //     { name: 'Jen', age: 28 },
  //     { name: 'Gunther', age: 27 }
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert user')
  //     }

  //     console.log(result)
  //   }
  // )

  // Insert Many Tasks
  db.collection('tasks').insertMany(
    [
      { description: 'Clean the house', completed: true },
      { description: 'Renew inspection', completed: false },
      { description: 'Pot plants', completed: false }
    ],
    (error, result) => {
      if (error) {
        return console.log('Unable to insert tasks')
      }

      console.log(result)
    }
  )
})
