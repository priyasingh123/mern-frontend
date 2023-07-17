import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Notes from '../components/Notes' 

export default function Home(props) {

  /*for using noteContext, call useContext*/
  const context = useContext(NoteContext)
  const { addNote} = context

  /*set one note to empty and then update it with values user has entered*/
  const [note, setNote] = useState({'title':'', 'description':'','tag':''})
  const onChangeEvent = (e) => {
    setNote({...note, [e.target.id]: e.target.value?? ''})
  }

  const onNoteSubmit = async (event) => {
    event.preventDefault()
    let res = await addNote(note)
    if (res === 200) {
      props.showAlert ('Note added successfully','success')
    }
    else if (res === 400) {
      props.showAlert ('Title should be 3 characters long and description should be 5 characters long','danger')
    }
    else {
      props.showAlert ('some error occured','danger')
    }
    setNote({'title':'', 'description':'','tag':''})
  }

  return (
    <>
    <div className='container' style={{ marginTop: '60px' }}>
      <h2>Add your Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={note.title} onChange={onChangeEvent} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" value={note.description} onChange={onChangeEvent}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChangeEvent} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onNoteSubmit}>Submit</button>
      </form>
    </div>
    <Notes showAlert={props.showAlert}/>
    </>
  )
}
