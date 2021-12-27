// const add = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (a < 0 || b < 0) {
//         return reject('Numbers must be non-negative')
//       }

//       resolve(a + b)
//     }, 2000)
//   })
// }

// const doWork = async () => {
//   const sum = await add(1, 99)
//   const sum2 = await add(sum, 50)
//   const sum3 = await add(sum2, -3)
//   return sum3
// }

// doWork()
//   .then((result) => {
//     console.log('result', result)
//   })
//   .catch((e) => {
//     console.log('e', e)
//   })

// Testing Myself
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be non-negative')
      }

      // console.log('this code wont run')
      resolve(a + b)
    }, 2000)
  })
}

const doWork = async () => {
  try {
    const sum = await add(1, 99)
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3)
    return sum3
  } catch (e) {
    // console.log(e)
    // return 'what?'
    throw new Error(e)
  }
}

doWork()
  .then((result) => {
    console.log('result', result)
  })
  .catch((e) => {
    // console.log('eeeee', e)
    console.log('eeeee', e.message)
  })
