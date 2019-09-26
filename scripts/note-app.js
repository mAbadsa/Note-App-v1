'use strict'

// get save note from local storage
const getSaveNote = function () {
    const noteJSON = localStorage.getItem('notes');
    try {
        return noteJSON ? JSON.parse(noteJSON) : [];        
    } catch (error) {
        return [];
    }
    // if (noteJSON !== null) {
    //     return JSON.parse(noteJSON);
    // } else {
    //     return [];
    // }
}

// Save the notes to localstorage
const saveNote = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id;
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
}
//Generate DOM Elements
const generateDomEl = function (note) {
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a');
    const button = document.createElement('button');
    const createTime = document.createElement('p');
    const updateTime = document.createElement('p');
    button.textContent = 'X';
    button.classList.add('delete-btn');
    noteEl.classList.add('note-btn-container')

    textEl.setAttribute('class', 'note-title');
    textEl.setAttribute('href', `edit.html#${note.id}`);
    noteEl.appendChild(textEl);
    noteEl.appendChild(createTime);
    noteEl.appendChild(updateTime);
    createTime.innerHTML = `<span class="time-text">Created at: </span> ${moment(note.createdAt).format('MMM DD, YYYY, hh:mm:ss A')}`;
    updateTime.innerHTML = `<span class="time-text">Update at: </span> &nbsp; ${moment(note.updateAt).format('MMM DD, YYYY, hh:mm:ss A')}`;
    createTime.classList.add('time-stamp');
    updateTime.classList.add('time-stamp');
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unname notes';
    }
    noteEl.appendChild(button);
    button.addEventListener('click', e => {
        removeNote(note.id);
        saveNote(notes);
        renderNotes(notes, filters);
    })

    return noteEl;
}

const sortNotes = function (notes, sortBy) {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                return -1;
            } else if (a.updateAt < b.updateAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "alphapetically") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
    const filterNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    document.querySelector('#notes').innerHTML = '';

    filterNotes.forEach(note => {
        const domEl = generateDomEl(note);
        document.querySelector('#notes').appendChild(domEl)
    });
}

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
})

const generateLastEdit = function (timestamp) {
    return `last Edited : ${moment(timestamp).fromNow()}`;
}