import React, { useEffect, useState } from 'react';
import './FreelancersPage.css'; // Import CSS file
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import Heart from 'react-heart'
import { Rating } from '@smastrom/react-rating'
const FreelancersPage = () => {

  const navigate = useNavigate();
  const [freelancers, setFreelancers] = useState([]); 
  const [name, setName] = useState('');
  const [rating, setRating] = useState()

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')
  //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Get-All-Freelancers`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFreelancers(response.data)
      console.log(response.data);
      
      } catch (error) {
        console.log(error.response.status);
        const errorPages = error.response.status;
        if (errorPages === 403) {
          navigate('/error403');
        } else if (errorPages === 401) {
          navigate('/error401');
        } else if (errorPages === 500) {
          navigate('/error500');
        }
        if(error.response.data === 'No users found with the specified name.' || error.response.data === 'No Freelancer found.'){
          setFreelancers(null);
        }else{
          console.log(error.response)
        }
      }
    };

    const searchFreelancer = async()=>{
      try{
        const response = await axios.get(`${baseUrl}/api/Home/Get-All-Freelancer-With-The-SameName?name=${name}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        setFreelancers(response.data)
      }catch(error){
        if(error.response.data === 'No users found with the specified name.' || error.response.data === 'No Freelancer found.'){
          setFreelancers(null);
        }else{
          console.log(error.response)
        }
      }
    }

    //add and delete fav
  const addAndDeleteFav= async(Fid)=>{
    try{
      const response = await axios.post(`${baseUrl}/api/FreeFav/New-Delete-Fav-Freelancer?Fid=${Fid}`,{ Fid },{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      fetchData();
      console.log('OK de');
    } catch(error){
      console.log(error.response)
      }
   };
  return (
    <div className='find-freelancers'>
        <div className="freelancers-container">
          <div className=' my-2 '>
            <div className="search-fraalancer">
              <div>
                <input className="form-control" type="search" placeholder="Search For Freelancer" aria-label="Search" onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div>
              <button className="btn btn-outline-success mx-2" type="button" onClick={searchFreelancer}>Search</button>
              </div>
            </div>
          </div>
          <div>
            {freelancers ?(<> {freelancers.map((data)=>
              <div key={data.id} className="freelancer">
              <img src={data.profilePicture} alt="Profile" className="profile-picture" />
                <div className="freelancer-info">
                  <div className="title-container">
                    <Link to={`Profile/${data.id}`} className="full-name">{data.fullName}</Link>
                  </div>
                  <p className="title">{data.yourTitle}</p>
                  <p className="hourly-rate">Hourly Rate: ${data.hourlyRate}/houre</p>
                  <p className="description">{data.description}</p>
                  <div className="free-fav-s-buttons">
                    <Rating readOnly  style={{ maxWidth: '100px' }} value={rating} onChange={setRating}/>
                    <button className='fav-s-button'>
                    <Heart isActive={data.isFav} onClick={()=>addAndDeleteFav(data.id)} />
                    </button>
                  </div>
                </div>
              </div>
            )}</>) : (
              <div  className='no-freelancer'>
                  <h1>We Are Sorry There Are No Freelancers With This Name</h1>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}; 

export default FreelancersPage;