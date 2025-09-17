import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './shared/header/header'
import MobileNav from './shared/dynamic-nav/Dynamic-nav'
import Noticeboard from './features/noticeboard/Noticeboard'
import DynamicNav from './shared/dynamic-nav/Dynamic-nav'

function App() {
 

  return (
    <>
        <div className='container'>
            <Header></Header>
            <Noticeboard></Noticeboard>
            <DynamicNav></DynamicNav>
        </div>
    </>
  )
}

export default App
