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

  // 1. By property
  // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(user)
  // })

  // 2. By ObjectId
  // db.collection('users').findOne({ _id: new ObjectId('61c63b4d8dfdeeb043b64d35') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(user)
  // })

  // 3. find() returns Cursor, and use toArray()
  // db.collection('users')
  //   .find({ age: 30 })
  //   .toArray((error, users) => {
  //     console.log(users)
  //   })

  // 4. find() returns Cursor, and use count()
  // db.collection('users')
  //   .find({ age: 30 })
  //   .count((error, count) => {
  //     console.log(count)
  //   })

  // Challenge 1.
  db.collection('tasks').findOne({ _id: new ObjectId('61c63e925b6ee4c266bb5119') }, (error, task) => {
    console.log(task)
  })

  // Challenge 2.
  db.collection('tasks')
    .find({ completed: false })
    .toArray((error, tasks) => {
      console.log(tasks)
    })
})
