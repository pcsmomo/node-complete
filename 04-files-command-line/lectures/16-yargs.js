import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const yargs = _yargs(hideBin(process.argv))

// Customize yargs version
yargs.version('1.0.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: function () {
    console.log('Adding a new note!')
  }
})

console.log(yargs.argv)
