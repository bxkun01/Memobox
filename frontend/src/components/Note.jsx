import React from 'react';
import {useNavigate } from 'react-router-dom';

const Note = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');
  const navigate=useNavigate();
  const handleNoteUpdate= (id)=>{
    navigate(`note/update/${id}`)
    
  }

  return (
    <div className="rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2 bg-transparent text-white  backdrop-blur-md">
      <p className="font-semibold text-lg overflow-clip">{note.title}</p>
      <p className="italic overflow-clip">{note.content}</p>
      <p className="text-xs text-gray-400 italic">{formattedDate}</p>
      <div className='flex gap-5'>
        <button
          onClick={() => onDelete(note.id)}
          className="self-start mt-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-md transition"
        >
          Delete
        </button>
        <button onClick={()=>handleNoteUpdate(note.id)}  className="self-start mt-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-md transition">Update</button>
      </div>

    </div>
  );
};

export default Note;
