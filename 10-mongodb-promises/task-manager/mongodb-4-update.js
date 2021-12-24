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

  // 1. Promise Way
  // const updatePromise = db.collection('users').updateOne(
  //   { _id: new ObjectId('61c63d2f3ed2b00cdf63ef5e') },
  //   {
  //     $set: {
  //       name: 'Maggie'
  //     }
  //   }
  // )

  // updatePromise
  //   .then((result) => {
  //     console.log(result)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // 2. Without variable and different update oprators
  // $set, $inc, $rename, $unset
  // db.collection('users')
  //   .updateOne(
  //     { _id: new ObjectId('61c63d2f3ed2b00cdf63ef5e') },
  //     {
  //       $inc: {
  //         age: 1
  //       }
  //     }
  //   )
  //   .then((result) => {
  //     console.log(result)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // 3. updateMany()
  db.collection('tasks')
    .updateMany(
      { completed: false },
      {
        $set: {
          completed: true
        }
      }
    )
    .then((result) => {
      console.log(result.modifiedCount)
    })
    .catch((error) => {
      console.log(error)
    })
})
