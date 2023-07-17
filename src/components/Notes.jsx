import { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import {Link } from 'react-router-dom'
import ConfirmUpdate from './ConfirmUpdate'

const Notes = (props) => {
    const context = useContext(noteContext)
    const {notes, deleteNote, getAllNotes} = context

    const [updatedNote, setUpdatedNote] = useState ({'title':'', 'description':'','tag':''})

    const onDeleteNote = (id) => {
        deleteNote(id)
    }

    const onUpdateClick = (note) => {

        setUpdatedNote(note)
    }

    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    },[])

    return (<>
        <div className="container my-3">
            <h2>Your Notes</h2>
            <div className='container'>
                {notes.length === 0 && 'No Notes to display'}
                <div className="row">
                    {notes?.map((note, index) => {
                        return (
                            <div className="col-md-4 my-3" key={index}>
                                <div className="card" key={index}>
                                    <div className="card-body" key={index}>
                                        <h5 className="card-title">{note.title}</h5>
                                        <p className="card-text">{note.description}</p>
                                        <p className="card-text">{note.tag}</p>
                                        <Link to="/" className="btn btn-primary me-3" onClick={() => onUpdateClick(note)}>Update</Link>
                                        <Link to="/" className="btn btn-danger" onClick={()=>onDeleteNote(note._id)}>Delete</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <ConfirmUpdate note={updatedNote}/>
        </>
    )
}

export default Notes;


