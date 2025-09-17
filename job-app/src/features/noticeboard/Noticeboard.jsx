import './Noticeboard.css'
import company from '../../assets/icons/company.png'
import { useEffect, useState } from 'react';
function Noticeboard(){
    const [jobs, setJobs] = useState([]);

    useEffect(()=>{
        fetch('./data/jobs.json')
        .then(response=>response.json())
        .then(data=>{
            setJobs(data)
            console.log(data)
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
                                <button><h1>Apply!</h1></button>
                              
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