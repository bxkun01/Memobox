import React, { useEffect, useState } from 'react'
import api from '../api'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { User, Mail, Calendar, Camera } from "lucide-react"
import { motion } from "framer-motion"

const Profile = () => {
  const [data, setData] = useState({})
  const [formData, setFormData] = useState({
    bio: '',
    profile_picture: null
  })

  useEffect(() => {
    api.get('api/profile/')
      .then(res => {
        setData(res.data)
        setFormData({ ...formData, bio: res.data.bio || '' })
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const realFormData = new FormData()
    realFormData.append('bio', formData.bio)
    if (formData.profile_picture) {
      realFormData.append('profile_picture', formData.profile_picture)
    }

    api.put('api/profile/', realFormData)
      .then(res => {
        setData(res.data)
        alert('✨ Profile updated successfully!')
      })
      .catch(() => alert('❌ Update failed'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-start justify-center pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="rounded-2xl shadow-2xl bg-slate-900/80 backdrop-blur border border-slate-700">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-6">
              <div className="relative">
                {data.profile_picture ? (
                  <img
                    src={data.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={48} className="text-slate-300" />
                  </div>
                )}
                <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition">
                  <Camera size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setFormData({ ...formData, profile_picture: e.target.files[0] })
                    }
                  />
                </label>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-white">{data.username}</h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <Mail size={16} /> {data.email}
                </p>
                <p className="text-slate-500 flex items-center gap-2 text-sm">
                  <Calendar size={14} /> Joined {data.created_at}
                </p>
              </div>
            </div>

            {/* Bio display */}
            <div className="bg-slate-800/60 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-white mb-2">About me</h2>
              <p className="text-slate-300 leading-relaxed">
                {data.bio || 'No bio yet. Tell the world something about you.'}
              </p>
            </div>

            {/* Edit form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Update your bio..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-slate-800 border-slate-700 text-slate-100 min-h-[120px]"
              />

              <div className="flex justify-end">
                <Button type="submit" className="px-6 py-2 rounded-xl">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Profile
