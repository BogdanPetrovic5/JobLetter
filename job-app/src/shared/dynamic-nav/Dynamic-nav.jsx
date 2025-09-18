import './Dynamic-nav.css'
import job from '../../assets/icons/job.png'
import profile from '../../assets/icons/profile.png'
import search from  '../../assets/icons/search.png'
import filters from '../../assets/icons/filters.png'
import logo from '../../assets/icons/logo.png'
import login from '../../assets/icons/login.png'
import { useState } from 'react'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
function DynamicNav({setLogoutDialog}){
    const[isLogged, setLoginStatus] = useState(false)

    const openDialog = () =>{
        setLogoutDialog(true);
    }
 
    return (
       
        <div className="dynamic-nav">
          
            <div className="dynamic-nav-wrapper">
                <div className='logo'>
                     <img src={logo}/> <h1>JobLetter</h1>
                </div>
                <div className='search'>
                    <img src={search} alt="" />
                    <input placeholder='Search for jobs...'></input>
                </div>
                <div className='filters tab'>
                    <img src={filters} alt="" />
                    <p>Filters</p>
                </div>
                <Link to='/notice-board'>
                    <div className='jobs tab'>
                        <img src={job} alt="" />
                        <p>Home</p>
                    </div>
                </Link>
               
                <Link to='/profile/me'>
                    <div className='profile tab' >
                        <img src={profile} alt="" />
                        <p>Profile</p>
                    </div>
                </Link>
                
                <div className='logout tab' onClick={()=>openDialog()}>
                    <img src={login} alt="" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DynamicNav