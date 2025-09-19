import './Noticeboard.css'
import company from '../../assets/icons/company.png'
import { use, useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Form from '../new-application/Form';
function Noticeboard(){
    const [jobs, setJobs] = useState([]);
    const outletContext = useOutletContext();

    if (!outletContext) return null; 

    const { applyJob } = outletContext;
    useEffect(()=>{
        fetch('./data/jobs.json')
        .then(response=>response.json())
        .then(data=>{
            setJobs(data)
          
        }).catch((error)=>{
            console.log("Error while loading JSON: ", error)
        })
    },[])
  
    return(
        <div className='noticeboard-container'>
           
            <div className='noticeboard-list-wrapper'>

                {jobs.map((job,index)=>(
                     <div className='noticeboard-card' key={job.id}>
                    <div className='noticeboard-card-content'>
                        <div className='noticeboard-card-content-title'>
                            <div className='noticeboard-card-content-title-company-name-position'>
                                <h1>
                                    {job.company}
                                </h1>
                                <h2>
                                    {job.position}
                                </h2>
                            </div>
                            <img src={company}/>
                        </div>
                        <div className='noticeboard-card-content-job-info'>
                            <p>{job.salary} /yearly</p>

                            <div className='tag-names'>
                                {/* <div className='tag'>
                                    React
                                </div>
                                 <div className='tag'>
                                    CSS
                                </div>
                                 <div className='tag'>
                                    Node.js
                                </div> */}
                                {job.tags.map((tag, index)=>(
                                    <div className='tag' key={index}>
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            <div className='noticeboard-card-content-job-info-bottom-section'>
                                <p>{job.location}</p>
                                <button onClick={()=>applyJob(job)}><h1>Apply!</h1></button>
                              
                            </div>
                            
                        </div>
                    </div>
                </div>
                ))}
               
            </div>
        </div>
    )
}
export default Noticeboard;