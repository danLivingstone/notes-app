import { initializeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const saveElement = document.querySelector('#save-note');
const removeElement = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
initializeEditPage(noteId);

// Save user title input into local storage in realtime
titleElement.addEventListener('input', (event) => {
  const note = updateNote(noteId, {
    title: event.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

// Save user body input into local storage in realtime
bodyElement.addEventListener('input', (event) => {
  const note = updateNote(noteId, {
    body: event.target.value
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

// Setup save button to return the user to the homepage
saveElement.addEventListener('click', (event) => {
  location.assign('/index.html');
});

// Setup remove button to delete a note and redirect back to homepage
removeElement.addEventListener('click', (event) => {
  removeNote(noteId);
  location.assign('/index.html');
});

// Sync notes across multiple window instances
window.addEventListener('storage', (event) => {
  if (event.key === 'notes') {
    initializeEditPage(noteId);
  }
});
