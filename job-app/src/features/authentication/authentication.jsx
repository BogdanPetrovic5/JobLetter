import './authentication.css'
import auth from '../../assets/icons/auth.png'
import { useState } from 'react'
function Authentication(){
    const [toggleForm, toggle] = useState(false)
    return(
        <div className="auth-container">
            <div className='auth-wrapper'>
                <div className='auth-header'>
                    <img src={auth}/>
                </div>
                {toggleForm ? (
                    <div className='register-form form'>
                    <h1>Register</h1>
                    <div className='input-wrapper'>
                        <div>
                            <span>Username</span>
                            <input type="text" />
                        </div>
                        <div>
                            <span>Email</span>
                            <input type="email" />
                        </div>
                        <div>
                            <span>Password</span>
                            <input type="password" />
                        </div>
                        
                        
                       
                    </div>
                    <button>Register</button>
                    <p>Already have an account? <span className='form-switch' onClick={()=> toggle(false)}>Login here!</span> </p>
                </div>    

                ): (
                     <div className='login-form form'>
                    <div className='input-wrapper'>
                          <h1>Login</h1>
                    <div className='input-wrapper'>
                        <div>
                            <span>Email</span>
                            <input type="email" />
                        </div>
                        <div>
                            <span>Password</span>
                            <input type="password" />
                        </div>
                        
                        
                       
                    </div>
                    <button>Login</button>
                    <p>Don't have an account? <span className='form-switch' onClick={()=> toggle(true)}>Register here!</span> </p>
                    </div>
                </div>
                )}
                
               
            </div>
        </div>
    )
}
export default Authentication;