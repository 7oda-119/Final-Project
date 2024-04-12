import React from 'react'
import './Errors.css'
import { useNavigate } from 'react-router-dom';
function Error404() {
    const navigate = useNavigate();
    function navigateHome(){
        navigate('/')
    }
    
  return (
    <div>
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<div></div>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<button onClick={navigateHome}>home page</button>
		</div>
	</div>
    </div>
  )
}
export default Error404;