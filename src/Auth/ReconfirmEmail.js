import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './image/logo.png'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
export default function ReconfirmEmail() {
    const [email, setEmail] = useState('');
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const res = await axios.post(`${baseUrl}/Resend-Confirmation-Link?email=${email}`)
        console.log(res.data);
        toast("check your Email box")
    } catch (error) {
      console.log(error.res);
    }
};

  return (
    <div className=' d-flex justify-content-center'>
        <div className="cont py-4">
        <form onSubmit={handleSubmit}>
            <div>
                <h1><img src={logo} alt='logo'/>Task Sync</h1>
                <p> Enter the email address and we'll send you a link to confirm the email</p>
            </div>
            <div className='row d-flex justify-content-center'>
            <input className='form-control ' type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className='confirm'>
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
