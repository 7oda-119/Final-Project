import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../Auth/image/logo.png'
import Cookie from 'cookie-universal'
import './Home.css'
function Navbar() {

  const navigate = useNavigate();
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');
  const role = cookies.get('role');

  const logoNav = ()=>{
    if(role === 'User'){
      navigate('/myjobs')
    }else if(role === 'Freelancer'){
      navigate('/findwork')
    }else if(role === 'Admin'){
      navigate('/categories')
    }else{
      navigate('/')
    }
  }

  return ( 
    <>
        <nav className="navbar navbar-expand-lg sticky-top nav shadow-sm" >
            <div className="container">
                <a className="navbar-brand" onClick={logoNav}><img style={{width:'70px', height:'50px',}} src={logo}/></a>
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
                      <Link className=" nav-link" to={'/gpt'} >AI Assistant</Link>
                    )}
                  </ul>
                </div>
            </div>
        </nav>
    </>
    
  )
}
export default Navbar;