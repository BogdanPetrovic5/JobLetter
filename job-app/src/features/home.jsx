import { Outlet } from "react-router-dom";
import Header from "../shared/header/header";
import DynamicNav from "../shared/dynamic-nav/Dynamic-nav";
import { useState } from "react";
import './home.css'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Form from "./new-application/Form";

function Home(){
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [newFormTab, setNewFormTab] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null);

    const handleChoice = async (choice) =>{
      if(choice ==='yes'){
        await signOut(auth)
      }else{
        setLogoutDialog(false)
      }
    }

    const applyJob = (job) => {
        setSelectedJob(job);
        setNewFormTab(true);
    } 
    return(
         <div className='container'>
           {newFormTab && (
                <Form setNewFormTab={setNewFormTab} job={selectedJob}></Form>
            )}
          {logoutDialog && (
             <div className="logout-dialog">
                <div className="logout-dialog-wrapper">
                      <h1>Are you sure you want to log out?</h1>
                      <div className="choice-buttons">
                          <button onClick={()=> handleChoice('yes')}>Yes</button>
                          <button onClick={()=> handleChoice('no')}>No</button>
                      </div>
                </div>
              </div>
          )}
         
          <div className='container-content'> 
            <Header />
            <Outlet context={{ newFormTab, setNewFormTab, selectedJob, applyJob }}></Outlet>
          </div>
          <DynamicNav setLogoutDialog = {setLogoutDialog} setNewFormTab={setNewFormTab} setSelectedJob={setSelectedJob}/>
        </div>
    )
}
export default Home;