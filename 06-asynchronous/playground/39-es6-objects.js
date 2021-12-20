// Object property shorthand
const firstName = 'Andrew'
const userAge = 27

const user = {
  firstName,
  age: userAge,
  location: 'Philadelphia'
}

console.log(user)

// Object destructuring
const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
  // rating: 4.2
}

const { label: productLabel, stock, rating = 5 } = product
console.log(productLabel)
console.log(stock)
console.log(rating)

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock)
}

transaction('order', product)
