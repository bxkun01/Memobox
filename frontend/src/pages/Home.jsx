import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'
import { Link } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    setLoading(true)
    api.get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data)
        setLoading(false)
      })
      .catch((error) => {
        alert(error)
        setLoading(false)
      })
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!")
        else alert("Failed to delete!")
        getNotes()
      }).catch((error) => alert(error))
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://w.wallhaven.cc/full/28/wallhaven-281d5y.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="max-w-xl w-full mx-auto p-6 rounded-lg pt-20 h-full">
        <div className='flex justify-between items-center mb-6'>
          <h2 className="text-3xl font-bold text-gray-800">Notes</h2>
          <Link to='note/create' className='text-3xl'>+</Link>
        </div>

        <div className="flex justify-center items-center min-h-[200px]">
          {loading ? (
            <TailSpin height="80" width="80" color="#3b82f6" />
          ) : (
            <div className="space-y-4 w-full">
              {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
