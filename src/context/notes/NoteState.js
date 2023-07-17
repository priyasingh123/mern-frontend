import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const [notes, setNotes] = useState([])

  //get all notes
  const getAllNotes = async () => {
    try {
      let res = await fetch (`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTE0MDFmY2M4NmNiMTQ3MTc3N2FhIn0sImlhdCI6MTY4OTM4OTIzM30.XWpZSU-ekR_0x3wFR9ymn-4aF3xDjJkIl9asRI5tSD4'
        }
      })
      if (res.status) {
        const json = await res.json()
        setNotes(json)
      }
      else {
        console.log ('Some error occured')
      }
     
    } catch (error) {
      console.log (error)
    }
    
  }

  //add a note
  const addNote = async (note) => {
    //API call
    console.log ('NOTE ',JSON.stringify(note))
    try {
      let res = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTE0MDFmY2M4NmNiMTQ3MTc3N2FhIn0sImlhdCI6MTY4OTIzMTcyNX0.eXX1uUkvKNnKCAuIRQk0sAKGyNRS7WXtQFt5Xvya-HE'
        },
        body: JSON.stringify(note)
      })
      console.log ('RESPONSE ',res)
      if (res.status === 200) {
        setNotes(...notes, note)
      }
      else {
        console.log('Error occured')
      }
    } catch (error) {
        console.log(error.message)
    }
    setNotes([...notes, note])
  }

  //delete a note
  const deleteNote = async (id) => {
    try {
      let res = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhZTE0MDFmY2M4NmNiMTQ3MTc3N2FhIn0sImlhdCI6MTY4OTIzMTcyNX0.eXX1uUkvKNnKCAuIRQk0sAKGyNRS7WXtQFt5Xvya-HE'
        }
      })
      console.log ('RESPONSE ',res)
      if (res.status === 200) {
        setNotes(notes.filter(note => {
          return note._id !== id
        }))
      }
      else {
        console.log('Error occured')
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  //update a note
  const updateNote = () => {

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;