const { expect } = require('@jest/globals')
const { calculateTip } = require('./138-math.js')

test('Should calculate total with tip!', () => {
  const total = calculateTip(10, 0.3)
  expect(total).toBe(13)

  // if (total !== 13) {
  //   throw new Error('total tipi should be 13. Got ' + total)
  // }
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

test.skip('This should fail', () => {
  throw new Error('Failure')
})
