import React from 'react'
import logo from '..//image/logo.png'
import './Forget.css'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Forget() {
    const navigate = useNavigate();
    function haveNoAcc(){
        navigate('/clientOrfreelance')
    }
    const [email, setEmail] = useState('');
    
    const [error, setError] = useState('');
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(''); // Reset the error state
    
        try {
            const res = await axios.post(`https://localhost:7115/api/Auth/Forgot-Password?email=${email}`)
            toast.success("Check your email");
        } catch (error) {
          console.log(error);
          
        }
    };
  return (
    <div className='forget d-flex justify-content-center'>
        <div className="cont py-4">
        <form onSubmit={handleSubmit}>
            <div>
                <h1><img src={logo} /> Task Sync</h1>
                <p> Enter the email address and we'll send you a link to reset your password</p>
            </div>
            <div className='row d-flex justify-content-center'>
            <input className='form-control ' type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className='confirm'>
              <div>
                <a className="goToAcc" onClick={haveNoAcc} >Don't have an account?</a>
              </div>
              <div>
                <button className='btn btn-primary' type='submit'>Send</button>
              </div>
            </div>
            <ToastContainer />
        </form>
        </div>
    </div> 
  )
}
export default Forget;