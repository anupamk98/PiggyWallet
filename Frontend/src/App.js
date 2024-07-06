import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
import Login from './login';
import Sign from './sign';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Username } from './context';
import { useState,useEffect } from 'react';
function App() {
  const [context, setcontext] = useState("")
  const [logout, setlogout] = useState("false")
  const [toggle, settoggle] = useState(0)
  useEffect(() => {
    async function DejaVu() {
    const response = await fetch('http://localhost:4000/profile',{
      credentials:'include'
    })
    const res = await response.json()
    if(res !== "failed") {
      let user=res.username;
      setcontext(user)
      setlogout("true1")
    }
    else {
      setcontext("")
      setlogout("false")
    }
  }
  DejaVu()
  }, [toggle])
  
  const router = createBrowserRouter([
    {
      path : '/',
      element : <><Navbar logout={logout}/>
    <Main/>
    <Footer/></>
    },
    {
      path: "/login",
      element :<Login />
    },
    {
      path: "/sign",
      element : <Sign />
    }
  ])

  return (
    <>
    <Username.Provider value={{context,setcontext,logout,setlogout,toggle,settoggle}}>
    <RouterProvider router={router}/>
    </Username.Provider>
  </>
  );
}

export default App;
