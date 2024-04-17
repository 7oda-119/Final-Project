import React, { useEffect, useState } from 'react';
import './FreelancersPage.css'; // Import CSS file
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FreelancersPage = () => {
  const [freelancers, setFreelancers] = useState([]); 
  const [name, setName] = useState('');

  //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Get-All-Freelancers`);
      setFreelancers(response.data)
      console.log(response.data);
      
      } catch (error) {
        console.error(error);
      }
    };

    const searchFreelancer = async()=>{
      try{
        const response = await axios.get(`${baseUrl}/api/Home/Get-All-Freelancer-With-The-SameName?name=${name}`);
        console.log(response.data)
        setFreelancers(response.data)
      }catch(err){
        if(err.response.data === 'No users found with the specified name.' || err.response.data === 'No users found.'){
          setFreelancers(null);
        }else{
          console.log(err.response.data)
        }
      }
    }
  return (
    <div className="freelancers-container">
      <div className=' my-2 '>
        <div className="my-lg-0 d-flex justify-content-center">
          <div>
            <input className="form-control" type="search" placeholder="Search For Freelancer" aria-label="Search" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
          <button className="btn btn-outline-success mx-2" type="button" onClick={searchFreelancer}>Search</button>
          </div>
        </div>
      </div>
      <div>
        {freelancers ?(<div> {freelancers.map((data)=>
          <div  className="freelancer">
          <img src={data.profilePicture} alt="Profile" className="profile-picture" />
            <div className="freelancer-info">
              <div className="title-container">
                <h3 className="title">{data.fullName}</h3>
              </div>
              <p className="full-name">{data.yourTitle}</p>
              <p className="hourly-rate">Hourly Rate: ${data.hourlyRate}/houre</p>
              <p className="description">{data.description}</p>
              <div>
                <Link className="btn-hire" to={`Profile/${data.id}`} >Profile</Link>
                <button className="btn-favorite">Favorite</button>
              </div>
            </div>
          </div>
        )}</div>) : (
          <div style={{maxWidth:'500px', minHeight:'78vh'}} className='container'>
              <h1 className='text-danger font-weight-bold my-5'>We Are Sorry There Are No Freelancers With This Name</h1>
          </div>
        )}
      </div>
    </div>
  );
}; 

export default FreelancersPage;
