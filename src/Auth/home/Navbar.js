import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '..//image/logo.png'
import { IoMdSettings } from "react-icons/io";
import Cookie from 'cookie-universal'
import './Home.css'
function Navbar() {

  const navigate = useNavigate();

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');
  const role = cookies.get('role');

  const handleSignOut =()=>{
    cookies.remove('freelanceCookie')
    cookies.remove('role')
    window.location.pathname='/signin'
  }

  const handleAccount =()=>{
    if(role === 'Freelancer'){
      navigate('/account-freelancer')
    }else if(role === 'User'){
      navigate('/account-user')
    }
  }

  return ( 
    <>
        <nav className="navbar navbar-expand-lg sticky-top nav shadow-sm" >
            <div className="container">
                <Link className="navbar-brand" to={'/'}><img style={{width:'70px', height:'50px',}} src={logo}/></Link>
                {!token ? (
                  <Link className="nav-link " aria-current="page" to={'/'}>Home</Link>
                ) : null}
                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {!token?(
                        <Link className=" nav-link" to={'signin'}>Sign in</Link>
                    ) : (
                        <button className=" nav-link" >Payment</button>
                    )}
                  </ul>
                </div>
            </div>
        </nav>
    </>
    
  )
}
export default Navbar;