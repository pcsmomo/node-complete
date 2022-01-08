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
- until 16-testing
  - task-manager: copied from the previous section
- 17-web-socket
  - chat-app: socket.io

# Details

[README part 1](./README-1-10.md)
[Personal Project.md](./README-personal-prj.MD)

<details open> 
  <summary>Click to Contract/Expend</summary>

## Section 16: Testing Node.js (Task App)

### 137. Jest Testing Framework

```sh
npm install --save-dev jest
# "jest": "^27.4.7",
# in the lecture, npm install --save-dev jest@23.6.0
```

#### Why test?

- Saves time
- Creates reliable software
- Gives flexibility to developers
  - Refactoring
  - Collaborating
  - Profiling
- Peace of mind

### 140. Testing Asynchronous Code

[Jest CLI Options](https://jestjs.io/docs/cli)

### 141. Testing an Express Application: Part I

Create test.env copied from dev.env and set the MONGODB_URL for testing\
`MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test`

[Configuring Jest Documentation](https://jestjs.io/docs/configuration#testenvironment-string)

```json
{
  "jest": {
    "testEnvironment": "node"
  }
}
```

> If you are building a web app, you can use a browser-like environment through `jsdom` instead.

### 142. Testing an Express Application: Part II

supertest is a really good package for testing express app

[npm supertest](https://www.npmjs.com/package/supertest)

```sh
npm install supertest --save-dev
# "supertest": "^6.1.6"
# in the lecture, npm install supertest --save-dev@3.4.1
```

Separate app.js and index.js for testing app.js itself

### 143. Jest Setup and Teardown

[Jest Setup and Teardown](https://jestjs.io/docs/setup-teardown)

```sh
npm test
# A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```

```js
await request(app)
  .post('/users')
  .send({
    name: 'Noah',
    email: 'noah@example.com',
    password: 'fa12345678'
  })
  .expect(201)
```

### 144. Testing with Authentication

```js
const userOneId = new mongoose.Types.ObjectId()
await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200)
```

### 145. Advanced Assertions

```js
expect(user).not.toBeNull()
expect(response.body).toMatchObject({
  user: {
    name: 'Noah',
    email: 'noah@example.com'
  },
  token: user.tokens[0].token
})
```

[Jest more matchers](https://jestjs.io/docs/expect#tomatchobjectobject)

### 146. Mocking Libraries

- `const sgMail = require('@sendgrid/mail')`
- To mock this import, create as the same folder structure under `__mocks__`
- `__mocks__`
  - `@sendgrid`
  - `mail.js`
- and we don't want to do anything with the mock functions, so just declare those two functions we used in our code

[Jest Mock Functions](https://jestjs.io/docs/mock-function-api)

### 147. Wrapping up User Tests

fixtures: assets?

```js
// attach file or image
await request(app)
  .post('/users/me/avatar')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .attach('avatar', 'tests/fixtures/ghost.png')
  .expect(200)

// expect.any()
const user = await User.findById(userOneId)
expect(user.name).toEqual(expect.any(String))
expect(user.avatar).toEqual(expect.any(Buffer))
```

### 148. Setup Task Test Suite

separate initialising part into fixtures/db.js

- `"test": "env-cmd -f ./config/test.env jest --watch --runInBand",`
- Alias: -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
- [--runInBand](https://jestjs.io/docs/cli#--runinband)

## Section 17: Real-Time Web Applications with Socket.io (Chat App)

### 152. Creating the Chat App Project

```sh
mkdir chat-app
cd chat-app
npm init -y
npm i --save express
npm i --save-dev nodemon
```

### 154. Getting Started with Socket.io

- [socket.io](https://socket.io/)
- [npm socket.io](https://www.npmjs.com/package/socket.io)

```sh
npm i --save socket.io
# "socket.io": "^4.4.1"
# in the lecture, npm i --save socket.io@2.2.0
```

[socket.io client](https://socket.io/docs/v4/client-installation/#standalone-build)

```html
<!-- index.html -->
<script defer src="/socket.io/socket.io.js"></script>
<script defer src="/js/chat.js"></script>
```

### 155. Socket.io Events

```js
// on server
io.on('connection', (socket) => {
  socket.emit('countUpdated', count)
})

// on client
socket.on('countUpdated', (count) => {
  console.log('The count has been updated!', count)
})
```

```js
// on client
socket.emit('increment')

// on server
io.on('connection', (socket) => {
  socket.on('increment', () => {
    count++
    io.emit('countUpdated', count)
  })
})
```

1. `socket.emit('countUpdated', count)`
   - to the particular connection
2. `io.emit('countUpdated', count)`
   - to every single connection

#### debugging websites in Chrome for iOS

navigate `chrome://inspect` and click the `start logging` button

### 157. Broadcasting Events

3. `socket.broadcast.emit('message', 'A new user has joined')`
   - to everyone excluding myself

- io.on() is used when connecting only.
  - `io.on('connection', (socket) => {})`
- otherwise we use socket.on()
  - `socket.on('sendMessage', (message) => {})`
  - `socket.on('disconnect', (message) => {})`

### 158. Sharing Your Location

[geolocation - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

```js
// get the current location from the brwoser
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude)
})
```

```js
io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
```

### 159. Event Acknowledgements

[npm bad-words](https://www.npmjs.com/package/bad-words)

```sh
npm install --save bad-words
# "bad-words": "^3.0.4",
```

> This is good to check from frontend side if the server side has received my action/message correctly

### 160. Form and Button States

```js
// $ indicates an element as a convention
const $messageForm = document.querySelector('#message-form')
```

### 161. Rendering Messages

Using Mustache which is similar with handlebar(hbs) but mustache is the original.

[Mustache - Logic-less templates](http://mustache.github.io/)

</details>
