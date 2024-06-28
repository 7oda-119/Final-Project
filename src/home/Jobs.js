import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaCode, FaMobileAlt, FaPaintBrush } from 'react-icons/fa';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { baseUrl } from '../Api/Api';
import axios from 'axios';


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next-arrow" onClick={onClick}>
      &gt;
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
      &lt;
    </div>
  );
};

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);

   //fetch jobs
   useEffect(() => {
    fetcJobs();
  }, []);
  
  const fetcJobs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Get-All-JopPost-For-Home-Page`);
      console.log(response.data)
      setJobs(response.data.sort((a, b) => b.id - a.id));
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="job-posts">
      <h2>Jobs</h2>
      <Slider {...settings}>
        {jobs.map((job) => (
          <div key={job.id} className="jobs-card">
            <div className="job-info">
              <h3>{job.category}</h3>
              <p><strong>Title:</strong> {job.title}</p>
              <p><strong>Price:</strong> ${job.price}</p>
              <p>{job.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default JobPosts;
