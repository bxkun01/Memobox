import React, { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom'

const NoteUpdate = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  const { noteId } = useParams()

  useEffect(()=>{
    api.get(`/api/notes/${noteId}/`)
    .then(res=>res.data)
    .then(data=>{
      setTitle(data.title)
      setContent(data.content)
    })
    .catch(err=>console.log(err))

  },[])


  const updateNote = (e) => {
    e.preventDefault();
    api.put(`/api/notes/update/${noteId}/`, { content, title }) 
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
          alert("Note Updated!")
          navigate('/')
        } else {
          alert("Failed to update note!")
        }
      }).catch((err) => alert("Error: " + err))
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-5 text-white"
      style={{
        backgroundImage: "url('https://w.wallhaven.cc/full/dg/wallhaven-dgzj9o.jpg')",
      }}
    >
      <form
        onSubmit={updateNote}
        className="flex flex-col gap-4 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Update Note</h2>

        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-semibold">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="ring-1 ring-gray-300 bg-transparent text-white placeholder-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter note title"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="mb-1 font-semibold">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="ring-1 bg-transparent text-white placeholder-white ring-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Write your note here"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default NoteUpdate
