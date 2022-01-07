const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Noah',
      email: 'pcsmomo@gmail.com',
      password: 'fa12345678'
    })
    .expect(201)
})
