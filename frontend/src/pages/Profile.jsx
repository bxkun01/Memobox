import React, { useEffect, useState } from 'react'
import api from '../api'

const Profile = () => {
  const [data, setData] = useState({})
  const [formData, setFormData] = useState({
    bio: '',
    email: '',
    profile_picture: null
  })

  useEffect(() => {
    api.get('api/profile/')
      .then(res => res.data)
      .then(data => {
        setData(data)
      })
      .catch(err => console.log(err))
  }, [])

const handleSubmit = (e) => {
  e.preventDefault();

  const realFormData = new FormData();
  realFormData.append('bio', formData.bio);
  if (formData.profile_picture) {
    realFormData.append('profile_picture', formData.profile_picture);
  }

  api.put('api/profile/', realFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(res => {
    alert("Profile updated successfully!");
    setData(res.data);
  })
  .catch(err => {
    console.log("Error response:", err.response?.data);
    alert("Update failed!");
  });
}

  return (
    <div className='flex flex-col gap-2 pt-20 text-lg px-10'>
      <div className="text-2xl font-bold">Profile</div>
      <span><strong>Username:</strong> {data.username}</span>
      <span><strong>Profile Picture:</strong> {data.profile_picture}</span>
      <span><strong>Created At:</strong> {data.created_at}</span>
      <span><strong>Bio:</strong> {data.bio}</span>
      <span><strong>Email:</strong> {data.email}</span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <textarea
          placeholder="Update Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
        />
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
          Update
        </button>
      </form>
    </div>
  )
}

export default Profile
