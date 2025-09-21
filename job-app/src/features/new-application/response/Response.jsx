import { use, useEffect, useState } from 'react'
import './Response.css'

import { updateApplicationByCompanyAsnwer } from '../../../core/services/firebaseService';
import { useApplications } from '../../../context/ApplicationsContext';
import { Timestamp } from 'firebase/firestore';
function Response({formData, closeNote, setFormData}){
    const {addApplication} = useApplications();
    const [note,setNote] = useState("");
    const [choice, setChoice] = useState('yes')
    const [isSaved, setSavedStatus] = useState(false)
    useEffect(()=>{
      
        setNote(formData.response)
    },[formData.response])
    const handleForm = async (e) =>{
        e.preventDefault();
        if(choice === 'yes'){
            const success = await updateApplicationByCompanyAsnwer(formData.docID, note);
            if(success) {
                console.log("Response saved!");
                setSavedStatus(true)
              
                addApplication({
                    ...formData,
                    appID:formData.docID,
                    date: Timestamp.now(),
                    status:"applied",
                    response:note,
                    coverLetter:formData.cover
                })
              
                setTimeout(()=>{
                    setFormData({
                        company: '',
                        position: '',
                        firstname: '',
                        lastname: '',
                        cover: ''
                    })
                    closeNote(false);
                    setSavedStatus(false)
                },2000)
            }
            else console.log("Failed to save response!");
        }else{
            addApplication({
                    ...formData,
                    appID:formData.docID,
                    date: Timestamp.now(),
                    status:"applied",
                    response:"",
                    coverLetter:formData.cover
            }) 
            setFormData({
                company: '',
                position: '',
                firstname: '',
                lastname: '',
                cover: ''
            })
            closeNote(false)
        }
        
       
    }
    return(
        <div className="response-container">
            <div className="form-container">
                <form className="form" onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="response">Response</label>
                        <textarea required="" cols="50" rows="10" id="textarea" name="response" value={note}  onChange={(e) => setNote(e.target.value)}></textarea>
                    </div>
                    <button type="submit" onClick={() => setChoice('yes')} className="form-submit-btn">
                        {!isSaved ? ("Save") : ( <>Saved <dotlottie-wc src="https://lottie.host/07c5e4e5-baa4-4fcd-a492-5cc3d9510678/Ab9DiBui5a.lottie" style={{width:'20px', height:'20px'}} autoplay loop ></dotlottie-wc></>)}
                         
                    </button>
                    <button type="submit" onClick={() => setChoice('no')} className="form-submit-btn">Cancle</button>
                </form>
    </div>
        </div>
    )
}
export default Response