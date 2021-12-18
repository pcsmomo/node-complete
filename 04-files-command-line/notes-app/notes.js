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
    console.log(chalk.green('New note added!'))
  } else {
    console.log(chalk.red('Note title taken!'))
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
