import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './shared/header/Header'
import MobileNav from './shared/dynamic-nav/Dynamic-nav'
import Noticeboard from './features/noticeboard/Noticeboard'
import DynamicNav from './shared/dynamic-nav/Dynamic-nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './features/home'
import Authentication from './features/authentication/Authentication'
import PrivateRoute from './components/PrivateRoute'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Profile from './features/user-profile/profile'
import Form from './features/new-application/Form'
import { ApplicationProvider } from './context/ApplicationsContext'
function App() {
  const [user,setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser)
      setTimeout(()=>{
        setLoading(false)
      },1000)
    })
    return () => unsubscribe();
  },[])
  return (
    <ApplicationProvider>
       <Router>
        <Routes>
        
          <Route
            element={
              <PrivateRoute user={user} isLoading={isLoading}>
                <Home />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Noticeboard />} />
            <Route path="/notice-board" element={<Noticeboard />} />
            <Route path='/profile/me' element={<Profile user={user}/>}/>
       
          </Route>

        
          <Route path='/authentication' element={<Authentication setUser={setUser} setLoading={setLoading} />}/>

        
      </Routes>
    </Router>
    </ApplicationProvider>
     
  )
}

export default App
