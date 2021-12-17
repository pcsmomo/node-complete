import chalk from 'chalk'

console.log(chalk.blue('Hellow') + chalk.red('!!!!'))
const greenMsg = chalk.green.bold('Success!')
const greenMsgInv = chalk.green.inverse.bold('Success!')
console.log(greenMsg)
console.log(greenMsgInv)
