'use strict'

const createNote = document.querySelector('#create-note');
const searchNotes = document.querySelector('#search-notes');
const note = document.querySelector('#note');
const noteText = document.querySelector('.note-body #text-note');
const addNote = document.querySelector('.add-note');
const close = document.querySelector('.close');

let notes = getSaveNote();

const filters = {
    searchText: "",
    sortBy: 'byEdited'
}


renderNotes(notes, filters);

searchNotes.addEventListener('input', e => {
    filters.searchText = e.target.value;
    // note.textContent = renderNotes(notes, filters).forEach(note => {
    //     return note.title + "\n " + note.body;
    // });
    renderNotes(notes, filters);
})

addNote.addEventListener('click', e => {
    document.querySelector('#new-task').classList.remove('hidden');
})

createNote.addEventListener('click', e => {
    document.querySelector('#new-task').classList.add('hidden');
})

close.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#new-task').classList.add('hidden');
})

document.querySelector('#task-form').addEventListener('submit', (e) => {
    // document.querySelector('#task-form#').preventDefault();
    e.preventDefault();
    if (e.target.elements.titleTask.value === '' || e.target.elements.bodyTask.value === '') {

    } else {
        const noteDiv = document.querySelector("#notes");
        // const pTitle = document.createElement('div');
        // const pBody = document.createElement('p');
        // pTitle.innerHTML = `<p class="note-title" id="note">${e.target.elements.titleTask.value}</p>`/*<textarea readonly maxlength="80" rows="10" class="note-text" id="note" cols="30">${e.target.elements.bodyTask.value}</textarea>`*/
        // noteDiv.appendChild(pTitle);
        const id = uuidv4();
        notes.push({
            id: id,
            createdAt: moment().valueOf(),
            updateAt: moment().valueOf(),
            title: e.target.elements.titleTask.value,
            body: e.target.elements.bodyTask.value
        })
        // searchNotes.value = '';
        saveNote(notes);
        renderNotes(notes, filters);
        // location.assign('edit.html' + '#' + id);
    }
})

document.querySelector('#filter-by').addEventListener('change', e => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
})