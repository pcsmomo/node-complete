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

[README part 1](./README-1-10.md)
[Personal Project.md](./README-personal-prj.MD)

<details open> 
  <summary>Click to Contract/Expend</summary>

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

</details>
