import './Profile.css'
import profileimg from '../../assets/icons/profileimg.png'
import company from '../../assets/icons/company.png'
import { useEffect, useState } from 'react'


import { useApplications } from '../../context/ApplicationsContext'
import { fetchAllApplications, fetchUserProfile, updateApplicationByStatus } from '../../core/services/firebaseService'
import filtersIcon from '../../assets/icons/filterprofile.png'
import { useOutletContext } from 'react-router-dom'
function Profile({user}){
    const outletContext = useOutletContext();

    if (!outletContext) return null;
    const [userProfile, setUserProfile] = useState(null)
    
    const {applications, setAllApplications} = useApplications()
    const [filteredApplications, setFilteredApplications] = useState([])

    
    const {searchQuery} = outletContext;


    const [filters, toggleFilters] = useState(false);
    const [selectedFilterText, setFilterText] = useState('filters')

    const filterOptions = [
        "interviewed",
        "applied",
        "hired",
        "all"
    ]


    const changeStatus = (id) =>{
        
        const applicationToUpdate = applications.find((app)=>app.appID === id);

        const newStatus = applicationToUpdate.status === 'applied'
                    ? "interviewed" : applicationToUpdate.status === "interviewed"
                    ? "hired" : "applied"
      
        setAllApplications((application) => 
            application.map(
                app => app.appID === id ? {
                    ...app,
                    status:newStatus
                } : app
            )
        )
    
        updateDb(id, newStatus);
    }

    const updateDb = async (id, newStatus) =>{
        try{
            await updateApplicationByStatus(id, newStatus);
        }catch(error){
            console.log("Error while updating status of application: ", error);
        }
    }

    useEffect(()=>{
        if (!user?.uid) return;
        const fetchProfile = async () =>{
            try{
                const docResponse = await fetchUserProfile(user.uid)
                if(docResponse.exists()){
                    setUserProfile(docResponse.data())
                }else{
                    console.log("Error: No profile!")
                }
            }catch(error){
                console.log("Error while fetching the profile: ", error)
            }
           
        }

        fetchProfile();
    },[user])

    useEffect(()=>{
        if(!user?.uid) return;
        const initializeApplications = async () =>{
            try{
                const userApps = await fetchAllApplications(user.uid)
                userApps.sort((a,b) => b.date - a.date)
                setAllApplications(userApps)
                setFilteredApplications(userApps)
               
            }catch(error){
                console.log("Error while fetching applications: ", error);
            }
        }
        initializeApplications();
         return () => {
            setAllApplications([]);
            setFilteredApplications([]);
        };
    },[user])

    useEffect(()=>{
        if (!applications) return;

        let filtered = applications;

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(app =>
                app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedFilterText !== "all" && selectedFilterText !== "filters") {
            filtered = filtered.filter(app => app.status === selectedFilterText);
        }
        setFilteredApplications(filtered);
    
    }, [searchQuery, applications, selectedFilterText])

    const selectFilter = (index) =>{
        setFilterText(filterOptions[index])
        if(filterOptions[index] === 'all') {
            setFilteredApplications(applications)
            toggleFilters(false)

            return
        }
        setFilteredApplications(() =>{
            const sort = applications.filter(a => a.status === filterOptions[index]);
            
            return sort;
        })
        toggleFilters(false)
    }
    
    return(
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-info'>
                    <img src={profileimg} alt="" />
                    <h1>{userProfile?.firstname} {userProfile?.surname}</h1>
                    <h2>{userProfile?.email}</h2>
                    <h3 className='subtitle'>My experience</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit maxime vitae veritatis cum dignissimos distinctio facere possimus quaerat tempore. Fugiat tempora similique nihil nobis mollitia ipsum aliquid quod placeat nemo!</p>
                </div>
                
                <div className='profile-applications'>
                    <div className='profile-applications-title'>
                        <h1>List of your applications</h1>
                        <h1 onClick={()=>{

                           
                                toggleFilters(!filters)
                           
                            
                        }}>{selectedFilterText} <img src={filtersIcon}/></h1>
                        
                            <div  className={`select ${ filters ? "grow" : "" }`}  id='select'>
                                {filterOptions.map((option, index)=>(
                                    <div className='option' key={index} onClick={()=>selectFilter(index)}>
                                        {option}
                                    </div>
                                ))}
                               
                            </div>
                        
                      
                    </div>
                    
                    <div className='profile-applications-list'>
                        {filteredApplications?.map(application => (
                            <div className='application-card' key={application.appID}>
                                <div className='application-basic-info'>
                                    <div className='company-position-wrapper'>
                                        <div className='company-position'>
                                            <h1>{application.company}</h1>
                                            <h2>{application.position}</h2>
                                        </div>
                                        <img src={company}/>
                                    </div>
                                    
                                    <h1 className='cover-letter-title'>Cover letter</h1>
                                    <p className='cover-letter-content'>
                                        {application.coverLetter}
                                    </p>
                                    <h1 className='response'>
                                        Response
                                    </h1>
                                    <p>
                                        {application.response}
                                    </p>
                                </div>
                                <div className='application-details'>
                                   
                                    <div className='application-details-status'>
                                        <p className='date'>
                                            Date applied: {application.date.toDate().toDateString()}
                                        </p>
                                        <div className='status' onClick={()=>changeStatus(application.appID)}>
                                            
                                            <h3>{application.status}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                      
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile