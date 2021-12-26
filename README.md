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

</details>
