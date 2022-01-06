# node-complete

The Complete Node.js Developer Course (3rd Edition) by Andrew Mead and Rob Percival

## Folder Structure

- 03-module
  - notes-app
- 06-asynchronous
  - weather-app
- 07-web-server
  - web-server
    - node server fetching weather data
    - hbs templates
    - deploy to heroku
- 10-mongodb-promises
  - task-manager

# Details

[Personal Project.md](./README-personal-prj.MD)

<details open> 
  <summary>Click to Contract/Expend</summary>

## Section 1: Welcome

### 1. Welcome to the Class!

1. note taking application
   - basic feature: file system
2. weather application
   - web server
   - api
   - deployment
3. task manager app
   - authentication
   - email
   - mongodb - mongoose
   - testing
4. real time chat app
   - socket.io
   - websocket

## Section 2: Installing and Exploring Node.js

### 5. What is Node.js?

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

|       |  Chrome  |  Node   |
| :---: | :------: | :-----: |
| Using |    V8    |   V8    |
|       |  window  |    -    |
|       | document |    -    |
|       |    -     | global  |
|       |    -     | process |

### 10. Importing Your Own Files

modules have their own scope

### 11. Importing npm Modules

```sh
npm init -y
npm i --save validator
```

[npm validator](https://www.npmjs.com/package/validator)

```js
const validator = require('validator')
console.log(validator.isEmail('noah@example.com'))
console.log(validator.isURL('https://mead.io'))
```

### 12. Printing in Color

```sh
npm i --save chalk
# My version is chalk@5.0.0 which only supports es6 (import/export)
# chalk@4.1.0 still supports commonjs (require)
```

[npm chalk](https://www.npmjs.com/package/chalk)

#### .cjs vs .mjs

[What is the difference between .js and .mjs files? - Stackoverflow](https://stackoverflow.com/questions/57492546/what-is-the-difference-between-js-and-mjs-files)

- Common JS : require, module.exports
- ECMAScript : import, export

```json
// package.json
{
  // assume .js is using...
  "type": "commonjs", // require/module.exports
  "type": "module" // import/export
}
```

- `.cjs`: no matter what "type" is defined, we can use CommonJs syntax
- `.mjs`: no matter what "type" is defined, we can use es6 (ECMAScript) syntax

But here, chalk library doesn't support commonjs. (I have to down grade it to follow the course) \
So I will be using only commonjs syntax.

### 13. Global npm Modules and nodemon

```sh
npm install -g nodemon
```

## Section 4: File System and Command Line Args (Notes App)

### 15. Getting Input from Users

```sh
node 15-process-argv.js app
# [
#   '/Users/noah/.nvm/versions/node/v16.13.1/bin/node',
#   '/Users/noah/Documents/Study/Study_codes/udemy/node-complete/node-complete-git/04-files-command-line/lectures/15-process-argv.js',
#   'app'
# ]
```

- [0] = node js executable
- [1] = executed path
- from [2] = arguments

### 16. Argument Parsing with Yargs: Part I

- Command Line package
  - Both are faily popular
  - [npm yargs](https://www.npmjs.com/package/yargs)
  - [npm commander](https://www.npmjs.com/package/commander)
    - I have used it in 'typeacript react project'

```sh
npm install --save yargs

node app.js add --title="This is my title"
# { _: [ 'add' ], title: 'This is my title', '$0': 'app.js' }
node app.js --version
# 1.0.0
node app.js add
# Adding a new note!
node app.js --help
```

### 17. Argument Parsing with Yargs: Part II

```js
// argument option
builder: {
   title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
   }
}

// execute?
yargs.parse()
```

```sh
node app.js add --title="My title" --body="There are what I need to buy"
```

### 18. Storing Data with JSON

```js
// Reading in
const dataBuffer = fs.readFileSync('18-json.json')
console.log(dataBuffer)
// <Buffer 7b 22 74 69 74 6c 65 22 3a 22 45 67 6f 20 69 73 20 74 68 65 20 45 6e 65 6d 79 22 2c 22 61 75 74 68 6f 72 22 3a 22 52 79 61 6e 20 48 6f 6c 69 64 61 79 ... 2 more bytes>
console.log(dataBuffer.toString())
// Ego is the Enemy
```

## Section 5: Debugging Node.js (Notes Apps)

### 26. Debugging Node.js

```js
// notes.js
debugger
```

```sh
node inspect app.js add --title="Cours ideas" --body=""
# < Debugger listening on ws://127.0.0.1:9229/2e755cff-810f-43c0-91d5-0af21a3d7d6f
# < For help, see: https://nodejs.org/en/docs/inspector
# <
# < Debugger attached.
# <
#  ok
debug>
debug> restart
debug> help
```

1. Navigate `chrome://inspect`
2. (Optional) Configure
   - localhost:92222
   - localhost:92229
3. click "inspect"
4. Add folder on the left side
5. use Console

## Section 6: Asynchronous Node.js (Weather App)

### 31. Making HTTP Requests

- [Darksky API](https://darksky.net/) - merged to Apple
- [Weatherstack API](https://weatherstack.com/)

Create a account for Weatherstack

http://api.weatherstack.com/current?access_key=MY_API_KEY&query=melbourne

### 31. Making HTTP Requests

```sh
npm init -y
npm i --save request
```

[npm request](https://www.npmjs.com/package/request)

npm request is deprecated but still very popular.\
We could use `npm postman-request` instead. postman team maintains the request

### 32. Customizing HTTP Requests

[Weatherstack Documentation](https://weatherstack.com/documentation)

### 33. An HTTP Request Challenge

- [Mapbox API - Map Geocoding](https://docs.mapbox.com/api/search/geocoding/#forward-geocoding)
  - Search 'CITY' and get geocode

### 34. Handling Errors

```sh
npm i --save chalk@4.1.0
# chalk@4.1.0 still supports commonjs (require)
```

### 41. Bonus: HTTP Requests Without a Library

- [http.request - Node DOC](https://nodejs.org/api/http.html#httprequestoptions-callback)
- [https.request - Node DOC](https://nodejs.org/api/https.html#httpsrequestoptions-callback)

HTTP request is can be done with this built-in raw `http.request`,\
but the way to use is more complicated than other 3rd party libraries.\
such as axios, request, node-fetch and so on

## Section 7: Web Servers (Weather App)

### 43. Hello Express!

```sh
npm init -y
npm install --save express
npm install --save winston
```

```js
// node provides
console.log(__dirname)
console.log(__filename)
```

### 45. Serving up Static Assets

[node path.join](https://nodejs.org/api/path.html)

```js
// Route public/index.html first
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.send('<h1>Express</h1>')
})
```

```js
// Route app.get('/') first
const publicDirectoryPath = path.join(__dirname, '../public')

app.get('/', (req, res) => {
  res.send('<h1>Express</h1>')
})

app.use(express.static(publicDirectoryPath))
```

### 47. Dynamic Pages with Templating

- [handlebars - template engine](https://handlebarsjs.com/)
- [npm handlebars](https://www.npmjs.com/package/handlebars)
- [npm hbs - handlebars for express](https://www.npmjs.com/package/hbs)

```sh
npm i --save hbs
```

```js
// render() instead of send()
app.get('', (req, res) => {
  res.render('index')
})
```

### 48. Customizing the Views Directory

```js
const viewsPath = path.join(__dirname, '../templates')
app.set('views', viewsPath)
```

- [express app.set()](https://expressjs.com/en/5x/api.html#app.set)
- [express res.render()](https://expressjs.com/en/5x/api.html#res.render)

### 49. Advanced Templating

```sh
# Watch js, hbs extensions
nodemon src/app.js -e js,hbs
```

### 54. The Query String

```js
// http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
  console.log(req.query)
})
```

"Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client" \
-> 2 responses are sent

```js
// Common pattern, 'return res.send()'
if (!req.query.search) {
  return res.send({
    error: 'You must provide a search term'
  })
}
```

## Section 9: Application Deployment (Weather App)

### 61. Joining Heroku and GitHub

```sh
heroku -v
heroku cli
```

### 62. Version Control with Git

https://git-scm.com/book/en/v2

```sh
git --version
git init
git branch -m master main
git remote add origin git@github.com:pcsmomo/noah-weather-application.git
git push -u origin main

```

### 65. Setting up SSH Keys

```sh
ls -a -l ~/.ssh
ssh-keygen -t rsa -b 4096 -C "pcsmomo@gmail.com"
# ignore passphrase
eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/id_rsa
ssh -T git@github.com
```

### 67. Deploying Node.js to Heroku

```sh
heroku keys:add
heroku create noah-weather-app-demo
# https://noah-weather-app-demo.herokuapp.com/ | https://git.heroku.com/noah-weather-app-demo.git
git remote -v
git push origin main
git push heroku main
heroku open
# https://noah-weather-app-demo.herokuapp.com/
# Perfect!!!
```

### 69. Avoiding Global Modules

```sh
npm uninstall -g nodemon
npm install --save-dev nodemon
```

## Section 10: MongoDB and Promises (Task App)

### 71. MongoDB and NoSQL Databases

I will be using docker

```sh
docker run --name mongodb --rm -d -p 27017:27017 mongo
docker ps
```

> But this command will lose data when restart as it's not connected to a volume

### 74. Installing Database GUI Viewer

[Robo 3T](https://robomongo.org/)

Shell command

1. On Robo 3T
   - right click on my connection -> Open Shell -> db.version()
2. On docker

```sh
docker exec -it mongodb bash
mongo
use admin
# db.createUser({user:"user", pwd:"password", roles:[{role:"root", db:"admin"}]})
db.version()
# 5.0.5
```

### 75. Connecting and Inserting Documents

1. [MongoDB Node Driver](https://docs.mongodb.com/drivers/node/current/)
2. [npm mongodb](https://www.npmjs.com/package/mongodb)

```sh
npm init -y
npm install --save mongodb
# "mongodb": "^4.2.2"
# Andrew is using "mongodb": 3.x.x
```

> Succeeded to connect and write data in the mongodb

### 76. Inserting Documents

> Revisited Docker/Kubernetes course and recalled how to keep data

```sh
docker run --name mongodb --rm -d -p 27017:27017 -v task-manager-mongo:/data/db mongo
docker ps
```

[MongoDB Node Documentation](https://mongodb.github.io/node-mongodb-native/4.2/classes/Collection.html)

### 77. The ObjectID

[MongoDB ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/)

ObjectID : GUID (Globally Unique Identifiers)\
There won't be ID collision even when running several mongodb servers

- The 12-byte ObjectId value consists of:
- a 4-byte timestamp value, representing the ObjectId's creation, measured in seconds since the Unix epoch
- a 5-byte random value generated once per process. This random value is unique to the machine and process.
- a 3-byte incrementing counter, initialized to a random value

```sh
const id = new ObjectId()
console.log(id)
# new ObjectId("61c6416e770317fe7763125e")
console.log(id.getTimestamp())
# 2021-12-24T21:53:50.000Z
```

### 79. Promises

- Callback
  ```js
  callback('This is my error!', undefined)
  callback(undefined, [1, 4, 7])
  ```
  - two callback functions (error, success) will be called,
- Promise (Safe)

  ```js
  reject('Things went wrong!')
  resolve([7, 4, 1])
  ```

  - only reject will be called

- [Mongodb Update Operator Documation](https://docs.mongodb.com/manual/reference/operator/update/)
- $set, $unset, $inc, $min, etc.

## Section 11: REST APIs and Mongoose (Task App)

### 82. Section Intro: REST APIs and Mongoose

[mongoose js](https://mongoosejs.com/)

- ODM : Object Document Mapper
- elegant mongodb object modeling for node.js
- Mongoose makes easier to use mongodb than low level mongodb driver
- In mongoose, we can use Model and Model has structure of all properties and also validations

### 84. Creating a Mongoose Model

```sh
npm install --save mongoose
# "mongoose": "^6.1.3"

node src/db/mongoose.js
# {
#   name: 'Noah',
#   age: 30,
#   _id: new ObjectId("61c7e4bf5e1bc2380a939791"),
#   __v: 0
# }
```

`__v: 0`: the version of the document

```js
mongoose.model('User')
mongoose.model('Task')
// -> They will be saved as "users" and "tasks", lower case and plural
```

### 85. Data Validation and Sanitization: Part I

- [mongoose validation Documentation](https://mongoosejs.com/docs/validation.html)
- [npm validator](https://www.npmjs.com/package/validator)
- [mongoose SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
  ```js
  email: {
    type: String,
    required: true,
    validate(value) {}
  }
  ```

```sh
npm install --save validator
# "validator": "^13.7.0"
# in the lecture npm install --save validator@10.9.0
```

### 87. Structuring a REST API

REST API / RESTful API : (Representational State Transfer - Application Programming Interface)

- Create : POST / tasks
- Read (all) : GET / tasks
- Read (one) : GET / tasks/:id
- Update (partially) : PATCH / tasks/:id
- Update (whole) : PUT / tasks/:id
- Delete : DELETE / tasks/:id

- HTTP Request
  - Header
    - POST /tasks HTTP/1.1
    - Accept: application/json
    - Connection: Keep-Alive
    - Authorization: Bearer eyTUDJKCVOAPFOEWIFSOFA...
  - Body
    {"description": "Order new drill bits"}
- HTTP Response
  - Header
    - HTTP/1.1 201 Created
    - Date: Sun, 26 Dec 2021 16:18:40 GMT
    - Server: Express
    - Content-Type: application/json
  - Body
    {"\_id": "304cjkdfw034asd8ocvaw3", "description": "Order new drill bits", "completed": false}

### 89. Resource Creation Endpoints: Part I

```sh
npm install --save express
npm install --save-dev nodemon
npm install --save morgan
```

### 91. Resource Reading Endpoints: Part I

- [mongoose Queries Documentation](https://mongoosejs.com/docs/queries.html)
- `Model.find()`

```js
User.findById(_id)
  .then((user) => {
    if (!user) {
      // in Mongoose 6.1.3, if the length of _id is not 24, it will throw an error
      res.status(404).send()
    }

    res.send(user)
  })
  .catch((e) => {
    console.log('error?')
    res.status(500).send()
  })
```

### 93. Promise Chaining

1. Callback way - nesting nesting nesting : complicated like weather web-server
2. Promise way - easy to read

[Mongoose Model.countDocuments()](https://mongoosejs.com/docs/api/model.html#model_Model.countDocuments)

### 95. Async/Await

[How to disable TypeScript warnings in VSCode?](https://stackoverflow.com/questions/42632215/how-to-disable-typescript-warnings-in-vscode)

I just don't want to see this warning message, when I write example codes.

```
Cannot redeclare block-scoped variable 'add'.ts(2451\
93-promise-chaining.js(1, 7): 'add' was also declared here.
```

```js
// .vscode/settings.json
{
  // "typescript.validate.enable": false
  "javascript.validate.enable": false
}
```

### 98. Resource Updating Endpoints: Part I

```js
// { new : true } - returning new object
const user = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
```

### 98. Resource Updating Endpoints: Part I

```js
// every elements in 'updates' are true, it returns true
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
```

### 101. Separate Route Files

Differences between app and router\
link: https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

- app
  - `const app = express()`
  - has `listen()`
  - Internal State
- router
  - `const router = new express.Router()`
  - has smaller APIs

> And also, when the app is bigger\
> Router makes a strong structure to manage the app\
> router can be consiered as a mini app

```js
// app.js - Main app
var express = require('express'),
  dogs = require('./routes/dogs'),
  cats = require('./routes/cats'),
  birds = require('./routes/birds')

var app = express()

app.use('/dogs', dogs)
app.use('/cats', cats)
app.use('/birds', birds)

app.listen(3000)
```

```js
// dogs.js - Mini app
var express = require('express')
var router = express.Router()
router.get('/', function (req, res) {
  res.send('GET handler for /dogs route.')
})
router.post('/', function (req, res) {
  res.send('POST handler for /dogs route.')
})
module.exports = router
```

## Section 12: API Authentication and Security (Task App)

### 103. Securely Storing Passwords: Part I

[npm bcrypt](https://www.npmjs.com/package/bcryptjs)

```sh
npm i --save bcryptjs
# "bcryptjs": "^2.4.3", published 5 years ago, but still being used
```

```js
// salt value 8 is default
const hashedPassword = await bcrypt.hash(password, 8)
```

> Hashing algorithm is only one-way. Cannot reverse

### 104. Securely Storing Passwords: Part II

- [mongoose Schemas](https://mongoosejs.com/docs/guide.html)
- [mongoose middleware](https://mongoosejs.com/docs/middleware.html)

```js
// ** Must use a stand function to bind, not an arrow function
userSchema.pre('save', function (next) {
  const user = this
  console.log('just before saving')
  next()
})
userSchema.post()
```

However `userSchema.pre('save', function (next) {})` won't be affected by findByIdAndUpdate\
So it has to be changed

```js
const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
⬇️⬇️⬇️
const user = await User.findById(req.params.id)
Object.assign(user, req.body)
// updates.forEach((update) => (user[update] = req.body[update]))
await user.save()
```

### 105. Logging in Users

`unique: true` : duplication is not allowed and create an index for that property

Need to drop the database and create it again

### 106. JSON Web Tokens

[npm jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

```sh
npm i --save jsonwebtoken
# "jsonwebtoken": "^8.5.1",
```

```js
const jwt = require('jsonwebtoken')
// const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '0 seconds' })
const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
const data = jwt.verify(token, 'thisismynewcourse')
```

### 107. Generating Authentication Tokens

```js
// .methods. Instance Methods
// No arrow function. It needs to be bound
userSchema.methods.generateAuthToken = async function () {}
// .statics. : Model Methods
userSchema.statics.findByCredentials = async (email, password) => {}
```

### 109. Accepting Authentication Tokens

Add jwt token in the header

- Header tab
  - Key: 'Authorization'
  - Value: 'Bearer <JWT Token>'

### 110. Advanced Postman

We can use Environment variables \
When swapping between local / production url

1. url
   1. Add Environment at the top-right
      - variable: url
      - initial value: localhost:3000
      - current value: localhost:3000
   2. replace `localhost:3000` to {{url}}
2. token
   - We can set Auth -> Bearer Token in each request, but we can do even better
   1. remove Autorization key from the header
   2. Set Auth type to 'Inherit auth from parent' in Auth tab of the http request
   3. Click 'Edit' the workplace setting at the left
   4. Auth tab, set Bearer token and my jwt token (without 'Bearer ')
   5. and set auth for Create user/Login user to 'No Auth'
3. token - advanced
   - Set workplace Bearer token to {{authToken}}
4. Pre-req Tab
   - Before request
5. Tests Tab
   - After response
   ```js
   // Login user - Tests
   if (pm.response.code === 200) {
     pm.environment.set('authToken', pm.response.json().token)
   }
   ```
   ```js
   // Create user - Tests
   if (pm.response.code === 200) {
     pm.environment.set('authToken', pm.response.json().token)
   }
   ```
6. Now if token is expired, we can simply login once, we can set token
7. And when we see the environment, 'authToken' is automatically added

### 112. Hiding Private Data

```js
// Converts this document into a plain-old JavaScript object (POJO).
const userObject = user.toObject()
```

```js
// when it go through JSON.stringify, the toJSON() proceeds
userSchema.methods.toJSON = function () {}
```

```js
const user = await User.findByIdAndDelete(req.user._id)
if (!user) {
  return res.status(404).send()
}
⬇️⬇️⬇️
await req.user.remove()
```

### 115. Authenticating Task Endpoints

```js
const Task = mongoose.model('Task', {
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // user._id
  }
})
```

1. Mongoose Populate()

[mongoose Populate Documentation](https://mongoosejs.com/docs/populate.html)

```js
const task = await Task.findById('61cd4fe0f31b0e2675e05d42')
// await task.populate('owner').execPopulate() // Old syntax
await task.populate('owner')
console.log(task.owner)
// {
//   _id: new ObjectId("61ccd8c91cdd283eba56ac02"),
//   name: 'Maggie',
//   email: 'mei@gmail.com',
//   password: '$2a$08$qllmnTS0SPU7Akfp/zsYQOa6XDHyKMA4qSEVhWYJZNwjYMu6AVTtm',
//   age: 27,
//   tokens: [
//     {
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjZDhjOTFjZGQyODNlYmE1NmFjMDIiLCJpYXQiOjE2NDA4MTQ3OTN9._f9Oqebbo9e94QSGVP98ZjKt_mO-WlrlwflwpPg7M1g',
//       _id: new ObjectId("61ccd8c91cdd283eba56ac04")
//     },
//   ],
//   __v: 2
// }
```

2. Mongoose Virtuals

- [mongoose Virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html#populate)
- In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.

```js
// models/user.js
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})
```

```js
const user = await User.findById('61ccd8c91cdd283eba56ac02')
await user.populate('tasks')
console.log(user.tasks)
```

## Section 13: Sorting, Pagination, and Filtering (Task App)

### 118. Working with Timestamps

[mongoose Schema options](https://mongoosejs.com/docs/api/schema.html#schema_Schema)

```js
const userSchema = new mongoose.Schema(
  {},
  {
    timestamps: true
  }
)
```

And drop the database

> the timestamps shows only UTC time as mongoose only uses it.\
> It we want, we can use 'npm moment-timezone'\
> [Storing different time zone](https://stackoverflow.com/questions/35672248/how-to-change-date-timezone-in-mongoose)

### 120. Paginating Data

- [mongoose populate options limit](https://mongoosejs.com/docs/populate.html#limit-vs-perDocumentLimit)
- [mongoose query.prototype.skip()](https://mongoosejs.com/docs/api.html#query_Query-skip)

## Section 14: File Uploads (Task App)

### 123. Adding Support for File Uploads

- [npm multer - file upload](https://www.npmjs.com/package/multer)
- maintained by express team

```sh
npm install --save multer
# "multer": "^1.4.4",
```

- Testing upload with postman
  - POST localhost:3000/upload
  - Body -> form-data
    - Key: select 'File' and write 'upload'
    - Value: choose .jpg file

### 126. Handling Express Errors

```js
// Way 1
app.get(
  '/error',
  errorMiddleware,
  (req, res) => {
    res.send()
  },
  // Error handling
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

// Way 2
app.use((error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
```

### 127. Adding Images to User Profile

```js
// Buffer type is binary such as images
avatar: {
  type: Buffer
}
```

```js
// when multer doesn't have 'dest' property
// multer will not save file in the avatars folder, but route handle it now
const upload = multer({
  // dest: 'avatars',
})

req.user.avatar = req.file.buffer
```

Go to jsbin.com site and check the saved avatar binary code works,

```html
<img src="data:image/jpg;base64, {Binary code}" />
```

### 128. Serving up Files

```js
// response header
res.set('Content-type', 'image/jpg')
```

### 129. Auto-Cropping and Image Formatting

[npm sharp - resize image](https://www.npmjs.com/package/sharp)

```sh
npm install --save sharp
```

```js
// 1. resize
// 2. convert to png
const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
```

## Section 15: Sending Emails (Task App)

### 131. Exploring SendGrid

Setting an account for Sendgrid and get the API key

```sh
npm install --save @sendgrid/mail
# "@sendgrid/mail": "^7.6.0",
# in the lecture npm install --save @sendgrid/mail@6.3.1
```

The email sent via sendgrid will go in the Spam folder in my gmail account.

### 133. Environment Variables

```sh
npm i --save-dev env-cmd
# "env-cmd": "^10.1.0",
# in the lecture npm install --save env-cmd@8.0.2
```

### 135. Heroku Deployment

```sh
# 15-email/task-manager
git --version
git init
git branch -m master main
git remote add origin git@github.com:pcsmomo/noah-task-manager-api.git
git push -u origin main
```

```sh
# Heroku
heroku create noah-task-manager-api

# setup my config
heroku config:set key=value
git push heroku main
```

> Heroku is up, but something wrong.. hmm\
> Fixed up the MONGO_URL, and everything works perfect

</details>
