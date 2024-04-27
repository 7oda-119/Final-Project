import React, { useEffect, useState } from 'react';
import './JobPost.css'; 
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal'
const JobPostsPage = () => {

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
        console.error(error.response.status);
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
        if(err.response.data === 'NO jobs found by title full' || err.response.data === 'NO jobs found by title gra'){
          setJobPosts(null)
        }
        else(
          console.log(err.response)
        )
      }
    }

  const handleFavoriteClick = (id) => {
    setJobPosts(prevJobPosts => prevJobPosts.map(jobPost => {
      if (jobPost.id === id) {
        return { ...jobPost, isFavorited: !jobPost.isFavorited };
      }
      return jobPost;
    }));
  };

  return ( 
    <div style={{minHeight:'90vh'}}>
      <div className='my-2'>
        <div className="my-lg-0 d-flex justify-content-center">
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
                <button className="heart-s-button" onClick={() => handleFavoriteClick(jobPost.id)}>
                  {jobPost.isFavorited ? 'Is Favorited' : '\u2661 Favorite'}
                </button>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div style={{maxWidth:'500px', minHeight:'78vh'}} className='container'>
              <h1 className='text-danger font-weight-bold my-5'>We Are Sorry There Are No Jobs With This Name</h1>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default JobPostsPage;
