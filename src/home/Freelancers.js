
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { baseUrl, server } from '../Api/Api';
import { Rating } from '@smastrom/react-rating';
import { Link } from 'react-router-dom';


const Freelancers = () => {
  /*const freelancers = [
    { id: 1, name: 'John Doe', title: 'Frontend Developer', description: 'Experienced in React and Angular.', hourlyRate: 40, rating: 4, profilePic: 'https://via.placeholder.com/100', isFavorite: false },
    { id: 2, name: 'Jane Smith', title: 'Backend Developer', description: 'Specializes in Node.js and Python.', hourlyRate: 50, rating: 5, profilePic: 'https://via.placeholder.com/100', isFavorite: true },
    { id: 3, name: 'Sam Johnson', title: 'Full Stack Developer', description: 'Proficient in MERN stack.', hourlyRate: 45, rating: 3, profilePic: 'https://via.placeholder.com/100', isFavorite: false },
    // Add more freelancers as needed
  ];*/
  
  const [freelancers, setFreelancers] = useState([]);

   //fetch jobs
   useEffect(() => {
    fetcFreelancers();
  }, []);
  
  const fetcFreelancers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Get-All-Freelancers-For-Home-Page`);
      console.log(response.data)
      setFreelancers(response.data);
      } catch (error) {
          console.log(error.response);
      }
    };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => handleBeforeChange(oldIndex, newIndex),
    afterChange: (currentIndex) => handleAfterChange(currentIndex),
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    console.log(`Before slide change from ${oldIndex} to ${newIndex}`);
  };

  const handleAfterChange = (currentIndex) => {
    console.log(`After slide change to slide ${currentIndex}`);
  };


  return (
    <div className="freelancers">
      <h2>Freelancers</h2>
      <Slider {...settings}>
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="freelancer-card">
            <div className="freelancer-profile-section">
              <img src={`${server}${freelancer.profilePicture.replace(/\\/g, '/')}`} alt={freelancer.fullNamefullName} className="freelancer-profile-pic" />
            </div>
            <div className="freelancer-info">
              <h3>{freelancer.fullName}</h3>
              <p><strong>Position:</strong> {freelancer.yourTitle}</p>
              <p><strong>Hourly rate:</strong> ${freelancer.hourlyRate}</p>
              <div className="freelancer-rating">
                <Rating readOnly  style={{ maxWidth: '100px' }} value={freelancer.rate} />
              </div>
              <div className="freelancer-actions">
                <Link className="show-more-btn" to={`/freelancers/Profile/${freelancer.id}`}>Show More</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    &gt;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
    &lt;
  </div>
);

export default Freelancers;
