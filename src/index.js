import { createNote } from './notes';
import { setFilters } from './filters';
import { renderNotes } from './views';

// initial state of #notes div
renderNotes();

// create a new note and save it to localStorage.
document.querySelector('#create-note').addEventListener('click', (event) => {
    const id = createNote();
    location.assign(`/edit.html#${id}`);
});

// renders the filtered notes to the user.
document.querySelector('#search-text').addEventListener('input', (event) => {
    setFilters({
        searchText: event.target.value
    });
    renderNotes();
});

// filters based on the dropdown selection
document.querySelector('#filter-by').addEventListener('change', (event) => {
    setFilters({
        sortBy: event.target.value
    });
    renderNotes();
});

// Sync edit page notes with homepage notes
window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        renderNotes();
    };
});