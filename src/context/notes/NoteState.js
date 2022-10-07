import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    {
      "_id": "633a3e034176a54b285e24901",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title ",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:42:27.882Z",
      "__v": 0
    },
    {
      "_id": "633a3e124176a54b285e24922",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 2 ",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:42:42.607Z",
      "__v": 0
    },
    {
      "_id": "633a3e184176a54b285e24943",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 3 ",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:42:48.846Z",
      "__v": 0
    },
    {
      "_id": "633a40db033ef47b04fb445e4",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 4",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    },
    {
      "_id": "633a40db033ef47b04fb445e5",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 4",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    },
    {
      "_id": "633a40db033ef47b04fb445e6",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 4",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    },
    {
      "_id": "633a40db033ef47b04fb445e7",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 4",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    },
    {
      "_id": "633a40db033ef47b04fb445e8",
      "user": "632a75ec68f2344c15898ecb",
      "title": "My title 4",
      "description": "congratulation you made your first note",
      "tag": "Personal",
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)


  // Add a Note
  const addNote = async (title, description, tag) => {
    //TODO: API call
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyYTc1ZWM2OGYyMzQ0YzE1ODk4ZWNiIn0sImlhdCI6MTY2NDY3MzAwM30.crqGKoUax_BTDY6tPvMQvtLBfLYioZiOsPBboM3-jnw"
      },
      body: JSON.stringify({title, description, tag})
    });
      console.log(response)
    console.log("Adding a new Note");
    const note = {
      "_id": "633a40db033ef47b04fb445e83",
      "user": "632a75ec68f2344c15898ecb",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-10-03T01:54:35.735Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = (id) => {
    //TODO: API call
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit a Note
  const aditNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyYTc1ZWM2OGYyMzQ0YzE1ODk4ZWNiIn0sImlhdCI6MTY2NDY3MzAwM30.crqGKoUax_BTDY6tPvMQvtLBfLYioZiOsPBboM3-jnw"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  await response.json();
    
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, aditNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;