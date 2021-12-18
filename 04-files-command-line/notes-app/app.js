import chalk from 'chalk'
import getNotes from './notes.js'
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

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function () {
    console.log('Remove the note')
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List a note',
  handler: function () {
    console.log('Listing out all note')
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    console.log('Reading a note')
  }
})

console.log(yargs.argv)
