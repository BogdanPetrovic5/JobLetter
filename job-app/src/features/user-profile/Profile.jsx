import './Profile.css'
import profileimg from '../../assets/icons/profileimg.png'
import company from '../../assets/icons/company.png'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import up from '../../assets/icons/up.png'
function Profile({user}){

    const [userProfile, setUserProfile] = useState(null)
     const [applications, setApplications] = useState([
    ]);

    const changeStatus = (id) =>{

        let modified =  applications.map((current) =>(
            current.appID == id ? {
                ...current,
                status: 
                    current.status === 'applied'
                    ? "interviewed" : current.status === "interviewed"
                    ? "hired" : "applied"
            } : current
        ))

        setApplications(modified)
        const application = modified.find((app)=> app.appID === id)
        updateDb(id, application.status);
     
    }
    const updateDb = async (id, newStatus) =>{
        try{
            const docRef = doc(db, 'applications', id);
        
            await updateDoc(docRef, {
                status: newStatus
            })
        }catch(error){
            console.log("Error while updating status of application: ", error);
        }
       


    }
    useEffect(()=>{
         if (!user?.uid) return;
        const fetchProfile = async () =>{
            try{
                const docRef = doc(db,'users', user.uid)
                const docResponse = await getDoc(docRef);

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
        const fetchApplications = async () =>{
            try{
                const request = query(collection(db, 'applications'), where("useruid", "==", user.uid));
                const docRef = await getDocs(request)

                const userApps = docRef.docs.map((doc) => ({
                    appID:doc.id,
                    ...doc.data()
                }))
                setApplications(userApps)
               
            }catch(error){
                console.log("Error while fetching applications: ", error);
            }
           
        }
        fetchApplications();
    },[user])

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
                    <h1>List of your applications</h1>
                    <div className='profile-applications-list'>
                        {applications?.map(application => (
                            <div className='application-card' key={application.appID}>
                                <div className='application-basic-info'>
                                    <div className='company-position'>
                                        <h1>{application.company}</h1>
                                        <h2>{application.position}</h2>
                                    </div>
                                    <img src={company}/>
                                </div>
                                <div className='application-details'>
                                    <h1>Cover letter</h1>
                                    <p className='cover-letter-content'>
                                        {application.coverLetter}
                                        <br></br>
                                        {application.coverLetter}
                                    </p>
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