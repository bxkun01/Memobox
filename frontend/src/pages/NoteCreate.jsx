import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const NoteCreate = () => {

    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const navigate=useNavigate()

    const createNote = (e) => {
        e.preventDefault();
        api.post("api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201){
                    
                    
                    navigate('/')
                    alert("Note created!")

                } 
                else alert("Failed to create note!")
            }).catch((err) => alert(err))

    }
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-5 text-white"
            style={{
                backgroundImage: "url('https://w.wallhaven.cc/full/6o/wallhaven-6ozkzl.jpg')",
            }}
        >
            <form
                onSubmit={createNote}
                className="flex flex-col gap-4  backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold  text-center mb-4">Create a Note</h2>

                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 font-semibold ">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="ring-1 ring-gray-300 bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Enter note title"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="content" className="mb-1 font-semibold">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="ring-1 bg-transparent ring-gray-300 rounded-md  px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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

export default NoteCreate