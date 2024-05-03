import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Heart from 'react-heart'
import './Favorites.css'
function FavFreelancers() {

    const [active, setActive] = useState(true)
    const handleFavoriteClick =()=>{
        setActive(!active)
      }
      console.log(active)

  return (
    <div className='fav-freelancers'>
        <div className="fav-freelancers-container">
              <div className="fav-freelancer">
              <img src='' alt="Profile" className="profile-picture" />
                <div className="fav-freelancer-info">
                  <div className="fav-title-container">
                    <h3 className="title">fullName</h3>
                  </div>
                  <p className="full-name">yourTitle</p>
                  <p className="hourly-rate">Hourly Rate: $hourlyRate/houre</p>
                  <p className="description">description</p>
                  <div className="free-fav-s-buttons">
                    <Link className="profile-s-button">Profile</Link>
                    <button className='fav-s-button' > 
                    <Heart isActive={active} onClick={handleFavoriteClick} /> 
                    </button>
                </div>
                </div>
              </div>
          </div>
    </div>
  )
}

export default FavFreelancers