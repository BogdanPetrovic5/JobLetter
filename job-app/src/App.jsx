import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './shared/header/header'
import MobileNav from './shared/dynamic-nav/Dynamic-nav'
import Noticeboard from './features/noticeboard/Noticeboard'
import DynamicNav from './shared/dynamic-nav/Dynamic-nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './features/authentication/authentication'
import Home from './features/home'
function App() {
 

  return (
       <Router>
      <Routes>
       
        <Route element={<Home />}>
          <Route path="/" element={<Noticeboard />} />
          <Route path="/notice-board" element={<Noticeboard />} />
        </Route>

       
        <Route path='/authentication' element={<Authentication/>}>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
