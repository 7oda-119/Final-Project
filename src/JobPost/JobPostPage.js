import React, { useState } from 'react';
import './JobPost.css'; // Import CSS file

const JobPostPage = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const jobPost = {
    title: 'Frontend Developer Needed',
    description: 'We are looking for a frontend developer to join our team.',
    price: '$3000',
    duration: '30',
    category: 'Web Development',
    skills: 'HTML, CSS, JavaScript'
  };

  const handleFavoriteClick = () => {
    setIsFavorited(prevState => !prevState);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:'90vh'}}>
      <div style={{minWidth:'800px'}}>
        <div key={jobPost.id} className="job-post-container">
          <h3 className="job-post-s-title"> {jobPost.title}</h3>
          <p className="job-post-detail"><span className="job-post-label">Description:</span>  {jobPost.description}</p>
          <p className="job-post-detail"><span className="job-post-label">Price :</span> {jobPost.price}</p>
          <p className="job-post-detail"><span className="job-post-label">Duration:</span> {jobPost.duration} days</p>
          <p className="job-post-detail"><span className="job-post-label">Skills:</span> {jobPost.skills}</p>
          <div className="job-post-s-buttons">
            <button className="hire-s-button">Hire</button>
            <button className="heart-s-button" onClick={() => handleFavoriteClick(jobPost.id)}>
              {jobPost.isFavorited ? 'Is Favorited' : '\u2661 Favorite'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostPage;
