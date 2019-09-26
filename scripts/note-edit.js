'use strict'

const dateElement = document.querySelector('.last-edit');

const noteId = location.hash.substring(1);
let notes = getSaveNote();
let note = notes.find(note => {
    return note.id === noteId;
})

document.querySelector('#note-title-edit').value = note.title;
document.querySelector('#note-body-edit').value = note.body;
dateElement.textContent = generateLastEdit(note.updateAt);

document.querySelector('#note-title-edit').addEventListener('input', e => {
    note.title = e.target.value;
    note.updateAt = moment().valueOf();
    dateElement.textContent = generateLastEdit(note.updateAt);
    saveNote(notes);
})

document.querySelector('#note-body-edit').addEventListener('input', e => {
    note.body = e.target.value;
    note.updateAt = moment().valueOf();
    dateElement.textContent = generateLastEdit(note.updateAt);
    saveNote(notes);
})

document.querySelector('#save-note').addEventListener('click', e => {
    e.preventDefault();
    saveNote(notes);
    location.assign('index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find(note => {
            return note.id === noteId;
        })

        if (note === undefined) {
            location.assign('/index.html');
        }

        document.querySelector('#note-title-edit').value = note.title;
        document.querySelector('#note-body-edit').value = note.body;
        dateElement.textContent = generateLastEdit(note.updateAt);
    }
})