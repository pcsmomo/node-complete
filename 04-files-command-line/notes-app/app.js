import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addNote, removeNote, listNotes, readNote } from './notes.js'

const yargs = _yargs(hideBin(process.argv))

// Customize yargs version
yargs.version('1.0.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    removeNote(argv.title)
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List a note',
  handler() {
    listNotes()
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    readNote(argv.title)
  }
})

// console.log(yargs.argv)
yargs.parse()
