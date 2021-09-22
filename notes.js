const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length === 0){
        console.log('No Notes!!')
    }
    else {
        notes.forEach((note) => printNote(note))
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if (note){
        printNote(note)
    }
    else {
        console.log('No Note Found!!')
    }
}

const printNote = (note) => console.log('Title: ' + note.title + '\nBody: ' + note.body + '\n')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New Note Added!!'))
    }
    else {
        console.log(chalk.red('Note Title Taken!!'))
    } 
}

const removeNote = (title) => {
    const notes = loadNotes()
    
    const filteredNotes = notes.filter((note) => note.title != title)

    if (filteredNotes.length === notes.length) {
        console.log(chalk.red('No Note Found!!'))
    }
    else {
        console.log(chalk.green('Note Removed!!'))
    }

    saveNotes(filteredNotes)
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

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}