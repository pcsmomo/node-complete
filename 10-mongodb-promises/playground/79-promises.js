const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject('Things went wrong!')
    resolve([7, 4, 1])
  }, 2000)
})

doWorkPromise
  .then((data) => {
    console.log('Success!')
    console.log(data)
  })
  .catch((err) => {
    console.log('Fail!')
    console.log(err)
  })

//
//                            fullfilled
//                           /
// Promise   --  pending -->
//                           \
//                            rejected
//
