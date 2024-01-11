import React from "react";
import { Link } from "react-router-dom";

let getTitle = (note) => {
  const title = note.body.split("\n")[0]; // split by the new line, and turn it to array
//   console.log("hii title ", title);
  // take the value of first element in array
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title; // will return the first element
};

let getDate = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

let getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45);
  } else {
    return content;
  }
};

const ListItem = ({ note }) => {
//   console.log(note);
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note)}</span>
          {getContent(note)}
        </p>
        {/* format the update value */}
      </div>
    </Link>
  );
};

export default ListItem;
