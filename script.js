let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteIndex = null;

const notesList = document.getElementById("notes-list");
const noteContent = document.getElementById("note-content");
const saveBtn = document.getElementById("save-btn");
const searchInput = document.getElementById("search");

function renderNotes(filter = "") {
  notesList.innerHTML = "";
  notes
    .filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((note, index) => {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
      noteDiv.textContent = note.text.substring(0, 30) || "Untitled";
      noteDiv.onclick = () => {
        currentNoteIndex = index;
        noteContent.value = note.text;
      };
      notesList.appendChild(noteDiv);
    });
}

saveBtn.onclick = () => {
  const text = noteContent.value.trim();
  if (text) {
    if (currentNoteIndex !== null) {
      notes[currentNoteIndex].text = text;
    } else {
      notes.push({ text });
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(searchInput.value);
    noteContent.value = "";
    currentNoteIndex = null;
  }
};

searchInput.oninput = () => {
  renderNotes(searchInput.value);
};

renderNotes();
