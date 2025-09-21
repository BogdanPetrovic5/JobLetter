import { useEffect, useState } from 'react'
import './Form.css'
import Response from './response/Response';
import { submitApplication } from '../../core/services/firebaseService';
import { generateNote } from '../../core/services/openAIService';
import Loading from '../../shared/loading/Loading';


function Form({setNewFormTab, job}){
    
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        firstname: '',
        lastname: '',
        cover: ''
    })
    const [errors, setErrors] = useState({});
    const [isSubmitted, setSubmitted] = useState(false)
    const [note, toggleNote] = useState(false)
   
    const [isLoading, toggleLoading] = useState(false)
    const close = () =>{
        setFormData(null)
        setNewFormTab(false)
    }
    const handleChange = (e) =>{
       const {name, value} = e.target
       setFormData((current)=>({
        ...current,
        [name]:value
       }))
    }
    const handleApplication = async (e) =>{
        e.preventDefault()
        if(!validateForm()) return;
        try{
          
            const docID = await submitApplication(formData);
            toggleLoading(true);
            const response = await generateNote(formData.company, formData.position, formData.firstname)
            setFormData({
                ...formData,
                docID:docID,
                response:response
            })
      
            toggleLoading(false);
          
            setSubmitted(true);
            setTimeout(()=>{
                setSubmitted(false)
                toggleNote(true)
                
            },2000)

           
        }catch(error){
            console.log("Error while submiting application: ", error)
        }
    
    }

    const validateForm = () =>{
        const newErrors = {}
        if(formData.company.trim() === "") newErrors.companyError = "Must enter company name!"
        if(formData.position.trim() === "") newErrors.poisitionError = "Must enter position name!"
        if(formData.firstname.trim()==="") newErrors.firstnameError = "Must enter firstname!"
        if(formData.lastname.trim()==="") newErrors.lastnameError = "Must enter lastname!"
        if(formData.cover.trim() === "") newErrors.coverError = "Must enter cover letter!"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 
    }
    useEffect(() =>{
        if (!job) {
            setFormData({ company: '', position: '',  firstname:'', lastname:'', cover: '' });
            return;
        }

        setFormData({
            company:job.company,
            position:job.position,
            cover:''
        })
    },[job])
    return(
        <div className='form-wrapper'>
            {isLoading && (
                <div className='loading'>
                    <Loading></Loading>
                </div>
            )}
            
            {note && (
                 <Response formData={formData} closeNote={toggleNote} setFormData={setFormData}></Response>
            )}
           
            {isSubmitted && (  
                <div className='form-submitted'>
                    <dotlottie-wc
                        src="https://lottie.host/858fd86a-4e9c-41a9-8e78-7daf0d9f263a/WQPYk1B1Nk.lottie"
                        style={{ width: "240px", height: "240px" }}
                        autoplay
                        loop
                    ></dotlottie-wc>
                </div>
            )}
          
          {!isSubmitted && (
             <div className="form-container" onSubmit={handleApplication}>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="name">Company Name</label>
                        <input type="text" id="email" name="company" required="" value={formData?.company || ""} onChange={handleChange}/>
                        <p>{errors.companyError}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="poisition">Position</label>
                        <input type="text" id="email" name="position" required="" value={formData?.position || ""} onChange={handleChange}/>
                        <p>{errors.poisitionError}</p>
                    </div>
                     <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" id="email" name="firstname" required="" value={formData?.firstname || ""} onChange={handleChange}/>
                        <p>{errors.firstnameError}</p>
                    </div>
                     <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" id="email" name="lastname" required="" value={formData?.lastname || ""} onChange={handleChange}/>
                        <p>{errors.lastnameError}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="textarea">Cover letter</label>
                        <textarea name="cover" id="textarea" rows="10" cols="50" required="" onChange={handleChange} value={formData?.cover || ""}></textarea>
                        <p>{errors.coverError}</p>
                    </div>
                    <button className="form-submit-btn" type="submit">Submit</button>
                    <button className="form-exit-btn" onClick={()=>close()}>Cancle</button>
                </form>
            </div>
          )}
           
        </div>
    )
}
export default Form;