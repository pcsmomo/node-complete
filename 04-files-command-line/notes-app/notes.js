import fs from 'fs'
import chalk from 'chalk'

export const addNote = (title, body) => {
  const notes = loadNotes()

  // check title duplication
  const duplicateNote = notes.find((note) => note.title === title)

  // debugger

  if (!duplicateNote) {
    notes.push({ title, body })

    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

export const removeNote = (title) => {
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
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse(`${title} removed.`))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

export const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse('Yout notes'))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

export const readNote = (title) => {
  const notes = loadNotes()

  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}
