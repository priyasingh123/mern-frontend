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
          'auth-token': localStorage.getItem('token')
        }
      })
      if (res.status === 200) {
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
    try {
      let res = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(note)
      })
      if (res.status === 200) {
        setNotes([...notes, note])
        return (200)
      }
      else {
        console.log('Error occured')
        return (400)
      }
    } catch (error) {
      console.log(error.message)
      return (500)
    }
    
  }

  //delete a note
  const deleteNote = async (id) => {
    try {
      let res = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      if (res.status === 200) {
        setNotes(notes.filter(note => {
          return note._id !== id
        }))
        return (200)
      }
      else {
        console.log('Error occured')
        return (400)
      }
    } catch (error) {
      console.log(error.message)
      return (500)
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