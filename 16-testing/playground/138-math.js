// const calculateTip = (total, tipPercent) => {
//   const tip = total * tipPercent
//   return total + tip + tip
// }

const calculateTip = (total, tipPercent = 0.25) => total + total * tipPercent

module.exports = {
  calculateTip
}
