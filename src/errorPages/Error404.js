import React from 'react'
import './Errors.css'
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import './Errors.css'
function Error404() {

	const cookies = Cookie();
	const role = cookies.get('role');
    const navigate = useNavigate();
    function navigateHome(){
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
    <div className='errorPages'>
        <div id="errorN">
		<div className="errorN">
			<div className="errorNum">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<button onClick={navigateHome}>Back</button>
		</div>
		</div>
    </div>
  )
}
export default Error404;