import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = () => {
    let noteId = useParams().id
    let [note, setNote] = useState(null)

    useEffect(() => {
      getNote()
    }, [noteId])

    let getNote = async () => {
      if (noteId === 'new') return
      let response = await fetch(`/api/notes/${noteId}/`)
      let data = await response.json()
      setNote(data)
    }

    let createNote = async () => {
      let response = await fetch(`/api/notes/`,
        {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
      let response = await fetch(`/api/notes/${noteId}/`,
        {
          method: "PUT",
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(note)
        })
    }

    let handleSubmit = async () => {
      if(noteId !== 'new' && !note.body) {
        deleteNote().then(() => {console.log('deleteNote')})
      }
      else if (noteId !== 'new') {
        await updateNote().then(() => {console.log('updateNote')})
      }
      else if (noteId === 'new' && note !== null) {
        await createNote().then(() => {console.log('createNote')})
      }
    }

    let deleteNote = async () => {
      let response = await fetch(`/api/notes/${noteId}/`,
        {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json',
          }
        })
    }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3> 
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        <Link to="/">
            {noteId !== 'new' ? (
              <button onClick={deleteNote}> Delete </button>
            ) : (
              <button onClick={handleSubmit}> Done </button>
            )}
        </Link>
      </div>
        <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value}) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
