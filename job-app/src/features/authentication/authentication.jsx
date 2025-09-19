import './Authentication.css'
import authlogo from '../../assets/icons/auth.png'
import { use, useState } from 'react'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../../firebase";
import {setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Authentication({setUser, setLoading}){
    const navigate = useNavigate();
    const [toggleForm, toggle] = useState(false)
    const [errors, setErrors] = useState({});
    const [registerFormData, setRegisterFormData] = useState({
        firstname:"",
        surname:"",
        email:"",
        password:""
    })
    const [loginFormData, setLoginFormData] = useState({
        email:"",
        password:""
    })


    const handleRegisterFormDataChange = (e)=>{
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]:e.target.value
        })
    }
    const handleLoginFormDataChange = (e) =>{
        setLoginFormData({
            ...loginFormData,
            [e.target.name]:e.target.value
        })
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        try{
            console.log(loginFormData)
            signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password)
            .then(userCredentials =>{
                 const loggedUser = userCredentials.user

                setUser(loggedUser)
                setLoading(true)
                setTimeout(()=>{
                    setLoading(false)
                },1000)
                navigate('/'); 
            })
           
        }catch(error){
            console.log("Login failed", error.code, error.message)
            setErrors({error:"Login failed: " + error.code})
        }
        
    }

    const handleRegister = async (e) =>{
        e.preventDefault();

        if(validateCredentials()){
            let isSuccess = await proccessRegistration();
            if(!isSuccess) return
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
            },1000)
           navigate('/'); 
        }else{
            setTimeout(()=>{
                setErrors({})
            },2000)
        }
    }
    const validateCredentials = () =>{
        const newErrors = {}
        if (!registerFormData.firstname) newErrors.firstname = "Firstname is required";
         if (!registerFormData.surname) newErrors.surname = "surname is required";
        if (!registerFormData.email.includes("@")) newErrors.email = "Invalid email";
        if (registerFormData.password.length < 6) newErrors.password = "Min 6 chars";
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const proccessRegistration = async () =>{
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, registerFormData.email, registerFormData.password);
            const user = userCredentials.user

            await setDoc(
                doc(db, 'users', user.uid), 
                {
                    firstname:registerFormData.firstname, 
                    surname:registerFormData.surname, 
                    email:registerFormData.email,
                    createdAt:serverTimestamp()
                }
            )
            setUser(user)
            return true;
        }catch(error){
            if (error.code === 'auth/email-already-in-use') {
               const newError = {}
               newError.userExists = "Email already in use!"
               setErrors(newError)
               
            } else {
                console.error('Registration error:', error);
                
            }
            return false;
        }
       
    }

 
    return(
        <div className="auth-container">
            <div className='auth-wrapper'>
                <div className='auth-header'>
                    <img src={authlogo}/>
                </div>
                {toggleForm ? (
                    <form className='register-form form' onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div className='input-wrapper'>
                        <div>
                            <span>Firstname</span>
                            <input type="text" value={registerFormData.firstname} name='firstname' onChange={handleRegisterFormDataChange} />
                            <p>{errors.firstname}</p>
                        </div>
                         <div>
                            <span>Surname</span>
                            <input type="text" value={registerFormData.surname} name='surname' onChange={handleRegisterFormDataChange} />
                            <p>{errors.surname}</p>
                        </div>
                        <div>
                            <span>Email</span>
                            <input type="email" value={registerFormData.email} name='email' onChange={handleRegisterFormDataChange} />
                            <p>{errors.email}</p>
                            <p>{errors.userExists}</p>
                        </div>
                        <div>
                            <span>Password</span>
                            <input type="password" value={registerFormData.password} name='password' onChange={handleRegisterFormDataChange} />
                            <p>{errors.password}</p>
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                    <p>Already have an account? <span className='form-switch' onClick={()=> toggle(false)}>Login here!</span> </p>
                </form>    

                ): (
                <form className='login-form form' onSubmit={handleLogin}>
                    <div className='input-wrapper'>
                        <h1>Login</h1>
                        <div className='input-wrapper'>
                            <div>
                                <span>Email</span>
                                <input type="email" name='email' value={loginFormData.email} onChange={handleLoginFormDataChange}/>
                            </div>
                            <div>
                                <span>Password</span>
                                <input type="password"  name='password'  value={loginFormData.password} onChange={handleLoginFormDataChange}/>
                                <p>{errors.error}</p>
                            </div>
                        </div>
                        <button >Login</button>
                        <p>Don't have an account? <span className='form-switch' onClick={()=> toggle(true)}>Register here!</span> </p>
                    </div>
                </form>
                )}
                
               
            </div>
        </div>
    )
}
export default Authentication;