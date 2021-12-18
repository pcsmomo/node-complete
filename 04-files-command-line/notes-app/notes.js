import fs from 'fs'
import chalk from 'chalk'

export const getNotes = function () {
  return 'Your notes...'
}

export const addNote = function (title, body) {
  const notes = loadNotes()

  // check title duplication
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title
  })

  if (duplicateNotes.length === 0) {
    notes.push({ title, body })

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

export const removeNote = function (title) {
  const notes = loadNotes()

  /* way 1 */
  // const index = notes.findIndex(function (note) {
  //   return note.title === title
  // })

  // if (index < 0) {
  //   console.log(chalk.yellow('Note does not exist.'))
  // } else {
  //   notes.splice(index, 1)
  //   saveNotes(notes)
  //   console.log(chalk.green(`${title} removed.`))
  // }

  /* way 2 */
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title
  })

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse(`${title} removed.`))
    saveNotes(notes)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}
