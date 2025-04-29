
//const popupContainer= document.getElementById("popup");
const closeIcon= document.getElementById("close");
const NotesList= document.getElementById("notes-liste");
function Popup(){
  const popupContainer = document.createElement("div");

  popupContainer.innerHTML = `
  <div id="popupContainer" >
        <div class="header">
            <h1>Add a new Note</h1>
            <i class="fa-solid fa-xmark" id="close" onclick="closePopup()"></i>
        </div>
        <div class="titel">
            <label for="titel">Title</label>
            <input type="text" name="title" id="titel">
        </div>
        <div class="description">
            <label for="note-text">Description</label>
            <textarea id="note-text" placeholder="Note here"></textarea>
        </div>

        <button onclick="createNote()">Add Note</button>
    </div>
  `;
  document.body.appendChild(popupContainer);
}

function closePopup(){
  popupContainer.remove();
}

function createNote(){
const NoteText= document.getElementById("note-text").value;
const NoteTitel= document.getElementById("titel").value;
if (NoteText.trim()!=="" && NoteTitel.trim()!==""){ //trim() Remove spaces 
  const Note={
    id: new Date().getTime(),
    titel: NoteTitel,
    text: NoteText
  };
  const existingNotes=JSON.parse(localStorage.getItem('Notes') )|| []; 
  existingNotes.push(Note);
  localStorage.setItem('Notes', JSON.stringify(existingNotes));
  NoteText.value = '';
  NoteTitel.value='';
  popupContainer.remove();
  displayNotes();
}
}

function displayNotes(){

  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';

  const notes = JSON.parse(localStorage.getItem('Notes')) || [];

  notes.forEach(note => {

      const listItem = document.createElement('li');
      listItem.innerHTML = `
      <h1>${note.titel}</h1>
      <span>${note.text}</span>
      <div id="noteBtns-container">
          <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
          <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
      `;
      notesList.appendChild(listItem);

  });
}

function editNote(noteId) {
  const notes = JSON.parse(localStorage.getItem('Notes')) || [];
  const noteToEdit = notes.find(note => note.id == noteId); //returns the value of the first element that passes a test,executes a function for each array element 
  const noteText = noteToEdit ? noteToEdit.text : ''; //if noteToEdit true then noteToEdit.text then ''
  const noteTitel = noteToEdit ? noteToEdit.titel : '';
  const editingPopup = document.createElement("div");
  
  editingPopup.innerHTML = `
  <div id="editing-container" data-note-id="${noteId}">
      <h1>Edit Note</h1>
      <textarea id="note-titel" rows="1">${noteTitel}</textarea>
      <textarea id="note-text">${noteText}</textarea>
      <div id="btn-container">
          <button id="submitBtn" onclick="updateNote()">Done</button>
          <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
      </div>
  </div>
  `;

  document.body.appendChild(editingPopup);
}
function closeEditPopup() {
  const editingPopup = document.getElementById("editing-container");

  if(editingPopup) {
      editingPopup.remove();
  }
}

function updateNote() {
  const noteText = document.getElementById('note-text').value.trim();
  const noteTitel = document.getElementById('note-titel').value.trim();
  const editingPopup = document.getElementById('editing-container');

  if (noteText !== '' && noteTitel!=='') {
      const noteId = editingPopup.getAttribute('data-note-id'); // returns the value of an element's attribute.
      let notes = JSON.parse(localStorage.getItem('Notes')) || [];

      // Find the note to update
      const updatedNotes = notes.map(note => {  // creates a new array from calling a function for every array element.
          if (note.id == noteId) {
              return { id: note.id, titel:noteTitel, text: noteText };
          }
          return note;
      });

      // Update the notes in local storage
      localStorage.setItem('Notes', JSON.stringify(updatedNotes));

      // Close the editing popup
      editingPopup.remove();

      // Refresh the displayed notes
      displayNotes();
  }
}
function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem('Notes')) || [];
  notes = notes.filter(note => note.id !== noteId); //creates a new array filled with elements that pass a test provided by a function.

  localStorage.setItem('Notes', JSON.stringify(notes));
  displayNotes();
}

displayNotes();
