import './Dynamic-nav.css'
import job from '../../assets/icons/job.png'
import profile from '../../assets/icons/profile.png'
import logo from '../../assets/icons/logo.png'
import login from '../../assets/icons/login.png'

import { Link, } from 'react-router-dom'
import newapp from '../../assets/icons/new.png'
function DynamicNav({setLogoutDialog,setNewFormTab,setSelectedJob}){

  
    const openDialog = () =>{
        setLogoutDialog(true);
    }
    const openForm = () =>{ 
        setSelectedJob(null)
        setNewFormTab(true);
    }
    return (
       
        <div className="dynamic-nav">
          
            <div className="dynamic-nav-wrapper">
                <div className='logo'>
                     <img src={logo}/> <h1>JobLetter</h1>
                </div>
               
                 <div className='new tab' onClick={()=>openForm()}>
                    <img src={newapp} alt="" />
                    <p>New</p>
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