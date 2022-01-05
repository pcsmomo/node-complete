const sgMail = require('@sendgrid/mail')

// ../config.js
// const SENDGRID_API_KEY = ''
// module.exports = {
//   SENDGRID_API_KEY
// }

const { SENDGRID_API_KEY } = require('../config')

sgMail.setApiKey(SENDGRID_API_KEY)

sgMail.send({
  to: 'pcsmomo@gmail.com',
  from: 'pcsmomo@gmail.com',
  subject: 'This is my first creation',
  text: 'I hope this one actually get to you'
})

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
