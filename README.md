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

</details>
