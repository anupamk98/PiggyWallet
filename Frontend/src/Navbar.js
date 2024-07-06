import React from 'react'
import { useContext } from 'react'
import { Username } from './context'
const Navbar = (props) => {
  const user= useContext(Username)
  async function handlelogout() {
    await fetch('http://localhost:8080/logout',{
      credentials:'include'
    })
    user.setcontext("")
    user.setlogout("false")
  }
  return (
    <div className='Nav w-full min-h-20 bg-white flex justify-between px-20 py-2 flex-wrap text-black items-center gap-5'>
    <div className="logo flex items-center"><img src="piggy2.avif" className='w-20 bg-transparent' alt="" />
    <h2 className='text-2xl text-zinc-800 font-bold'>PiggyWallet</h2></div>
    <div className='flex gap-3 items-center'>
        {(props.logout === "false") &&
         <>
        <a href='/login' className="cursor-pointer login text-lg text-zinc-800 font-bold border-2 border-solid  border-zinc-900 px-2 py-1 rounded-md">Login</a>
        <a href='/sign' className="cursor-pointer signup text-lg text-zinc-800 font-bold border-2 border-solid  border-zinc-900 px-2 py-1 rounded-md">SignUp</a>
         </>}
         {(props.logout === "true1") &&
         <>

        <a onClick={handlelogout} className="cursor-pointer login text-lg text-zinc-800 font-bold border-2 border-solid  border-zinc-900 px-2 py-1 rounded-md">Logout</a>
         </>}
         {(props.logout === "true") &&
         <>
        <a href='/' className="cursor-pointer login text-lg text-zinc-800 font-bold border-2 border-solid  border-zinc-900 px-2 py-1 rounded-md">Home</a>
         </>}
    </div>
    </div>
  )
}

export default Navbar
