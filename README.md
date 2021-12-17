# node-complete

The Complete Node.js Developer Course (3rd Edition) by Andrew Mead and Rob Percival

## Folder Structure

- 03-module
  - notes-app

# Details

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

</details>
