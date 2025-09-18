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
function DynamicNav(){
    const[isLogged, setLoginStatus] = useState(false)

    const logOut = async () =>{
        try{
           await signOut(auth)
        }catch(error){
            alert("Server error: ", error)
        }
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
                <div className='jobs tab'>
                    <img src={job} alt="" />
                    <p>Home</p>
                </div>
                
                <div className='profile tab'>
                    <img src={profile} alt="" />
                    <p>Profile</p>
                </div>
                <div className='logout tab' onClick={()=>logOut()}>
                    <img src={login} alt="" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default DynamicNav