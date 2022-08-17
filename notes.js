const fs = require('fs')

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((n) => title === n.title)
    if (note) {
        console.log('Note found:', note.title, '->', note.body)
    } else {
        console.log('No note found with title:', title)
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((n) => title === n.title)

    debugger

    if (duplicateNote) {
        console.log('Duplicate note found with title:', title)
        return
    }
    
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    // return false -> filter does not include the item in the array
    // return true -> filter would include the item in the array
    const notesToKeep = notes.filter((n) => title !== n.title)
    const removed = notes.length > notesToKeep.length
    if (removed) {
        console.log('Note removed.')
        saveNotes(notesToKeep)
    } else {
        console.log('No note found.')
    }
}

const saveNotes = (notes) => {
    console.log('Saving Notes:', notes)

    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        console.error("Load Notes Exception:", e.toString())
        return []
    }
}

const printNotes = () => {
    const notes = loadNotes()
    if (notes.length <= 0) {
        console.log('No notes found.')
        return
    }
    console.log('Your notes:')
    notes.forEach((n) => {
        console.log('- ' + n.title)
    })
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: printNotes,
    readNote: readNote
}