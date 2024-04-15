import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '..//image/logo.png'
import Cookie from 'cookie-universal'
function Navbar() {

  const navigate = useNavigate();
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  const handleSignOut =()=>{
    cookies.remove('freelanceCookie')
    navigate('/signin')
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top nav">
            <div className="container">
                <Link className="navbar-brand" to={'/'}><img style={{width:'70px', height:'50px'}} src={logo}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                    {!token?(
                      <Link className="btn btn-outline-primary" to={'signin'}>Sign in</Link>
                    ) : (
                    <button className="btn btn-outline-primary" type='button' onClick={handleSignOut}>Sign out</button>
                    )}
                </ul>
                </div>
            </div>
        </nav>
    </>
    
  )
}
export default Navbar;