import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './shared/header/header'
import MobileNav from './shared/mobile-nav/mobile-nav'
import Noticeboard from './features/noticeboard/Noticeboard'

function App() {
 

  return (
    <>
        <div className='container'>
            <Header></Header>
            <Noticeboard></Noticeboard>
            <MobileNav></MobileNav>
        </div>
    </>
  )
}

export default App
