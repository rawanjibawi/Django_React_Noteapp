import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const { id } = useParams(); // use to take the dynamic id from the url
  const navigate = useNavigate(); // use to redirect to pages, used in react version 6
  const [note, setNote] = useState(null);
  
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    console.log("getNote");
    if(id === 'new'){return; }// stop don't fetch the api we are creating a new one
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    await fetch(`api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note), // backend will automatically update the updated method in django
    });
  };
let createNote = async () => {
  try {
    await fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    getNote();
    // After successfully creating the note, fetch the updated note list
     // because of lagging sometimes we need to reload the page to see the new notes, therefore we can recall the getNote() method
  } catch (error) {
    // Handle errors if the note creation fails
    console.error("Error creating note:", error);
  }
  navigate("/"); 

};

  let deleteNote =async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/"); // is used to redirect (used in version 6)
  
  };

  const handleSubmit = () => { 
    // stoped here
    fetch("/api/notes") // Replace with the correct endpoint
      .then((response) => response.json()) //convert json format to js object
      .then((data) => { // data is array of object to access the first id we do data[0].id 
        // Check if the ID exists in the JSON data
        let idExist = false;
    
        for(let i=0; i<data.length; i++){
      
          if(data[i].id === parseInt(id)){ // in url id is string convert it to integer
          idExist = true;
          break;
          }
        }
        if (idExist === true && note.body.trim()==='') { // if body of note is empty (in case empty it will return false, so ! is true)
          console.log('delete')  
          deleteNote();
          navigate('/')
          getNote();
        } else if (idExist) { // if id exist update
          updateNote();
          navigate("/"); 
        } else if (id === 'new' && note.body!==null) { // if id doesn't exist and the body is not empty (there's a written stuff) then create a note
          createNote();
        }
        // reset the variables
        idExist=false;
      })
      .catch((error) => {
        // Handle errors if the data cannot be fetched or parsed
        console.error("Error loading JSON data:", error);
      });
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {/* we don't want to delete when we first create a note */}
        {id !== "new" ? (
          <button onClick={deleteNote}> Delete </button>
        ) : (
          <button onClick={handleSubmit}> Done </button>
        )}
      </div>
      {note || id === "new" ? (
        <textarea
          onChange={(e) => {
            setNote({ ...note, body: e.target.value });
          }}
          value={note ? note.body : ""}
        ></textarea>
      ) : (
        <p>Note with ID {id} not found</p>
      )}
      {/* <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note ? note.body : ''} 
      ></textarea> */}
      {/* If you have nested routes, you can render them here */}
      <Outlet />
    </div>
  );
};

export default NotePage;

