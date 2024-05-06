import React, { useEffect, useState } from 'react';
import './JobPost.css'; 
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal'
import Heart from 'react-heart'
import { useNavigate } from 'react-router-dom';
const JobPostsPage = () => {

  const navigate =useNavigate();
  const [jobPosts, setJobPosts] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch jobs
  useEffect(() => {
    fetcJobs();
  }, []);
  
  const fetcJobs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/JobPosts/Get-Over-All-Project-Posts`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setJobPosts(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        const errorPages = error.response.status;
        if (errorPages === 403) {
          navigate('/error403');
        } else if (errorPages === 401) {
          navigate('/error401');
        } else if (errorPages === 500) {
          navigate('/error500');
        }
        else{
          console.log(error.response);
        }
      }
    };

    const [title, setTitle] = useState('');
    const searchForJob = async()=>{
      try{
        const response = await axios.get(`${baseUrl}/api/JobPosts/Get-All-Project-With-Same-Title?title=${title}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        console.log(response.data)
        setJobPosts(response.data.sort((a, b) => b.id - a.id))
      }catch(err){
        if(err.response.data === `NO jobs found by title ${title}`){
          setJobPosts(null)
        }
        else(
          console.log(err.response)
        )
      }
    }

    //add and delete fav job
    const addAndDeleteFav= async(jobId)=>{
      try{
        const response = await axios.post(`${baseUrl}/api/FavJobPost/New-And-Delete-JobPost-Fav?jobId=${jobId}`,{ jobId },{
          headers: {
             Authorization: `Bearer ${token}`
          }
        })
        console.log('OK de');
        fetcJobs();
      } catch(error){
        console.log(error.response)
        }
     };

  return ( 
    <div style={{minHeight:'90vh'}}>
      <div className='my-2'>
        <div className="search-job-posts">
          <div>
            <input className="form-control" type="search" value={title} placeholder="Search For Job" aria-label="Search" onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
          <button className="btn btn-outline-success mx-2" type="button" onClick={searchForJob} >Search</button>
          </div>
        </div>
      </div>
      <div className="job-posts-container">
        <h2 className='mt-2'>All Job Posts</h2>
        {jobPosts ? (
          <div>{jobPosts.map(jobPost => (
            <div key={jobPost.id} className="job-post-container">
              <h3 className="job-post-s-title">{jobPost.categoryName}</h3>
              <p className="job-post-detail">
                <span className="job-post-label">Title:</span> {jobPost.title}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Description:</span> {jobPost.description}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Price:</span> {jobPost.price}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Duration:</span> {jobPost.durationTime}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">User Name:</span> {jobPost.userFullName}
              </p>
              
              <div className="job-post-s-buttons">
                <button className="hire-s-button">Hire</button>
                <button className='fav-s-button' > 
                  <Heart isActive={jobPost.isFav} onClick={()=>addAndDeleteFav(jobPost.id)} style={{ width: "30px" }}/> 
                </button>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className='no-jobs'>
              <h1 >We Are Sorry There Are No Jobs With This Name</h1>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default JobPostsPage;
