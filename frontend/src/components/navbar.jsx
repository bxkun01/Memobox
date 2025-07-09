import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    api.get("/api/profile/")
      .then(res => {
        setUser(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  const ref=useRef();
  useEffect(()=>{

    const handleClickOutside=(event)=>{

        if(ref.current && !ref.current.contains(event.target)){
          setDropDown(false)

    }

    }
  
    document.addEventListener('mousedown', handleClickOutside)

    return  ()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }

  },[])

  if (!user) return <p>Loading...</p>

  return (
    <div className='flex justify-evenly py-4 gap-5 px-5 items-center fixed top-0 left-0 right-0 z-[100]'>
      <div className='text-2xl font-bold cursor-pointer' onClick={()=>navigate('/')}>Memobox</div>
      <div className='relative w-full'>
        <Search size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-white' />
        <input
          type='text'
          className='pl-10 pr-5 rounded-lg w-full h-12 bg-transparent text-black focus:outline-none focus:outline-black'
          placeholder="Search"
        />
      </div>

      <div className='flex gap-2 items-center relative flex-shrink-0'>
        <img src='https://i.pinimg.com/736x/38/d2/82/38d282e8b5a8558e170851af80fde32a.jpg' className='size-9 rounded-full' />

        {
          dropDown ? (
            <ChevronUp size={30} className='cursor-pointer' onClick={() => setDropDown(!dropDown)} />
          ) : (
            <ChevronDown size={30} className='cursor-pointer' onClick={() => setDropDown(!dropDown)} />
          )
        }

        {dropDown && (
          <div className='absolute -bottom-[200px]  rounded-lg -left-[290px] ring ring-gray-100 shadow-md bg-transparent backdrop-blur-md h-[200px] w-[350px] flex flex-col p-5 gap-5' ref={ref}>
            <div className='flex gap-3'>
              <img src='https://i.pinimg.com/736x/38/d2/82/38d282e8b5a8558e170851af80fde32a.jpg' className='size-14 rounded-full' />
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.username}</span>
                <span className='text-sm'>{user.email}</span>
              </div>
            </div>

            <div className='flex flex-col'>
              <span className='font-bold'>Settings</span>
              <span onClick={handleLogout} className='font-bold cursor-pointer'>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
