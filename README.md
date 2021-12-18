# node-complete

The Complete Node.js Developer Course (3rd Edition) by Andrew Mead and Rob Percival

## Folder Structure

- 03-module
  - notes-app
- 06-asynchronous
  - weather-app

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

</details>
