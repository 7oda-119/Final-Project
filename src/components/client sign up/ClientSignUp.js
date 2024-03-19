import React, { useState } from 'react'
import './ClientSignUp.css'
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';

function ClientSignUp() {
    const navigate = useNavigate();
    function handleSingIn(){
        navigate("/signin")
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!firstName) {
            newErrors.firstName = 'First Name is required';
        }
        
        if (!lastName) {
            newErrors.lastName = 'Last Name is required';
        }
        
        if (!email) {
        newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
        }
        
        if (!password) {
        newErrors.password = 'Password is required';
        } else if (password.length < 8) {
        newErrors.password = 'Password should be at least 8 characters long';
        }
        
        if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!country) {
            newErrors.country = 'Country is required';
        }
        
        return newErrors;
    };
    
    function handleSubmit(e){
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
    }

    
    
  return (
    <div className='box'>
        <div className="sec" id="sec">
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className="social-icons">
                <a href="#" className="icon"><FaGoogle /></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="FirstName" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                {errors.firstName && <span className='erorr'>{errors.firstName}</span>}
                <input type="text" placeholder="LastName" name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                {errors.lastName && <span className='erorr'>{errors.lastName}</span>}
                <input type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <span className='erorr'>{errors.email}</span>}
                <input type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <span className='erorr'>{errors.password}</span>}
                <input type="password" placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {errors.confirmPassword && <span className='erorr'>{errors.confirmPassword}</span>}
                <input type="text" placeholder="country" name='country' value={country} onChange={(e) => setCountry(e.target.value)}/>
                {errors.country && <span className='erorr'>{errors.country}</span>}
                <button type='submit'>Sign Up</button>
            </form>
        </div>
        <div className="toggle-sec">
            <div className="toggle">
                <div className="toggle-panel">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button onClick={handleSingIn} id="login">Sign In</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
export default ClientSignUp;