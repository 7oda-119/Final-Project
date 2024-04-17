import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '..//image/logo.png'
import { IoMdSettings } from "react-icons/io";
import Cookie from 'cookie-universal'
import './Navbar.css'
function Navbar() {

  const navigate = useNavigate();

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');
  const role = cookies.get('role');

  const handleSignOut =()=>{
    cookies.remove('freelanceCookie')
    cookies.remove('role')
    navigate('/signin')
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top nav">
            <div className="container">
                <Link className="navbar-brand" to={'/'}><img style={{width:'70px', height:'50px'}} src={logo}/></Link>
                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                <Link className="nav-link active" aria-current="page" to={'/freelancers'}>Freelancers</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {!token?(
                      <Link className="btn btn-outline-primary" to={'signin'}>Sign in</Link>
                    ) : (
                      <li className="nav-item dropdown">
                        <a className="setting-icon nav-link " href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <IoMdSettings />
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{minWidth:'30px'}}>
                          <li><button className="acc dropdown-item" onClick={handleAccount} >Account</button></li>
                          <li><button className="pay dropdown-item" >Payment</button></li>
                          <li><button className="out dropdown-item" onClick={handleSignOut}>Sign out</button></li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
            </div>
        </nav>
    </>
    
  )
}
export default Navbar;