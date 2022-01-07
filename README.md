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

</details>
