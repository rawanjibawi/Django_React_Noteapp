import React, { useState, useEffect } from "react";
// import notes from '../assets/data'
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
const NoteListPage = () => {
  const [notes, setNotes] = useState([]); // notes will be of array type []
  // use useEffect to get data from json database

  useEffect(() => {
    getNotes();
  }, [notes]); //fire when note is changed (if you add [] it will only fire when reloading)

  let getNotes = async () => {

    // use fetch api to get data from json
    let response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  
};



  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note) => {
          //console.log('notessss', note.id); // Log the note object here
          return <ListItem key={note.id} note={note} />;
        })}
      </div>
      <AddButton />
    </div>
  );
};

export default NoteListPage;
