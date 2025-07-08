import React, { useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'
import Navbar from '../components/navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.get("api/notes/")
      .then((res) => res.data)
      .then((data) => { setNotes(data); console.log(data) })

      .catch((error) => alert(error))
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!")
        else alert("Failed to delete!")
        getNotes();
      }).catch((error) => alert(error))

  }



  return (
  <div
    style={{
      backgroundImage: `url('https://w.wallhaven.cc/full/6k/wallhaven-6kpko7.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}
  >
    <Navbar />
    <div className="max-w-xl w-full mx-auto p-6 rounded-lg mt-10">
      <div className='flex justify-between items-center mb-6'>
        <h2 className="text-3xl font-bold  text-gray-800">Notes</h2>
        <Link to='note/create' className='text-3xl'>+</Link>
      </div>
      

      <div className="space-y-4 mb-8">

        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
    </div>
  </div>
)

}

export default Home