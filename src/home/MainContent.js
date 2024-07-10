import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaCode, FaPaintBrush, FaMobileAlt, FaChartLine, FaDatabase, FaLaptopCode, FaChartPie, FaPencilRuler } from 'react-icons/fa';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FreelanceImg from '../Auth/image/logo.png'
import axios from 'axios';
import { baseUrl } from '../Api/Api';
const categories = [
  { icon: <FaCode size={48} />, title: 'Development', description: 'Learn coding and software development.' },
  { icon: <FaPaintBrush size={48} />, title: 'Design', description: 'Explore creative and graphic design.' },
  { icon: <FaMobileAlt size={48} />, title: 'Mobile', description: 'Discover mobile app development.' },
  { icon: <FaChartLine size={48} />, title: 'Marketing', description: 'Master marketing and sales strategies.' },
  { icon: <FaDatabase size={48} />, title: 'Database', description: 'Learn about database management.' },
  { icon: <FaLaptopCode size={48} />, title: 'Web Development', description: 'Build and maintain websites.' },
  { icon: <FaChartPie size={48} />, title: 'Data Analysis', description: 'Analyze and interpret complex data.' },
  { icon: <FaPencilRuler size={48} />, title: 'Illustration', description: 'Create stunning illustrations.' }
];

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    <MdArrowForward size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
    <MdArrowBack size={24} />
  </div>
);

const MainContent = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [SearchForCategory, setCategories] = useState([]);
  const [notFound, setNotFound] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if(searchTerm === '' || searchTerm.trim()===''){
      setCategories([]);
        setNotFound('');
    }
    
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Category-Search?name=${searchTerm}`);
      console.log(response.data)
      setCategories(response.data);
    } catch (error) {
      if(error.response.data === 'No categories found matching the criteria'){
        setCategories([])
        setNotFound('Not exist !')
      }else{
        console.log(error.response);
      }
    }
    
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const backgroundElement = document.querySelector('.background-overlay');
      const opacity = Math.max(0, 1 - scrollY / 500); // Adjust the fade speed here
      if (backgroundElement) {
        backgroundElement.style.opacity = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="main-content">
      <img src={FreelanceImg} className='free-img'/>
      <div className="background-overlay"></div>
      <div className="hero">
        <h2>Welcome to Our Platform</h2>
        <p> Find the best resources for your needs.</p>
      </div>
      <div className="search-container">
        <div className="search-input-container">
            <input type="input" className="search-input" placeholder="Search about category.." 
            onChange={(e) => { setSearchTerm(e.target.value) }}
            onKeyPress={handleKeyPress}
          />
          {/*<button className='search-category'>Search</button>*/}
          {SearchForCategory.length > 0 ? (
            SearchForCategory.map((cat) => (
              <p className='showsearch-category' key={cat.id}>
                <span>{cat.name}</span>
              </p>
            ))
          ) : (
            <p className='not-found'>{notFound}</p>
          )}
        </div>
      </div>
      <div className="popular-categories">
        <h2>Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="job-card-wrapper">
              <div className="job-card">
                <div className="job-icon">{category.icon}</div>
                <div className="job-info">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MainContent;
