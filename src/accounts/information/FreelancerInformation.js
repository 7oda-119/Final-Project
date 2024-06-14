import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
import '.././CSS.css'
import { Link, useNavigate } from 'react-router-dom';
export default function Test() {

  const navigate = useNavigate();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneNumber, setPoneNumber] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [yourTitle, setYourTitle] = useState('');
  const [zip, setZip] = useState('');
  const [portfolioURL, setPortfolioURL] = useState('');
  const [profilePicture, setProfilePicture] = useState();
  const [selectedLangueges, setSelectedLangueges] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
     //call token 
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

    //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Account/Freelancer-Account`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.profilePicture)
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setusername(response.data.username);
      setRating(response.data.rate);
      setCountry(response.data.country);
      setState(response.data.state);
      setAddress(response.data.address);
      setAge(response.data.age);
      setPoneNumber(response.data.phoneNumber);
      setHourlyRate(response.data.hourlyRate);
      setDescription(response.data.description);
      setEducation(response.data.education);
      setExperience(response.data.experience);
      setPortfolioURL(response.data.portfolioURl);
      setProfilePicture(response.data.profilePicture);
      setZip(response.data.zip);
      setSelectedSkills(response.data.selectedSkills);
      setSelectedLangueges(response.data.selectedLanguages);
      setYourTitle(response.data.yourTitle);
    } catch (error) {
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      } else{
        console.log(error.response)
      }
    }
  };

  const [rating, setRating] = useState()

    //open modal of picture of freelancer
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openImageModal = () => {
    setIsModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const navigateToEdit = () =>{
    navigate('/edit-freelancer');
  }
  return (
    <div className='AccFree row' style={{minHeight:'83vh'}}>
        <div className=' col-12 row d-flex justify-content-center'>
            <div>
                <button className='editInfo btn btn-success' onClick={navigateToEdit}>Edit Information</button>
                <button className='edit-sk-lang btn btn-success' >Edit Language&Skills</button>
            </div>
            <div className=' col-10 row d-flex justify-content-between'>
                <h4>My Info</h4>
                <div className='rate col-4 py-3 ' style={{background:"white"}}>
                    <div className='d-flex justify-content-center'>
                        <img className='user-photo' src='https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <button onClick={openImageModal}><AiFillEdit className='edit-img'/></button>
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <div className='text-center'>
                            <span className='d-block mb-1' style={{fontWeight:'600'}}>{firstName} {lastName}</span>
                            <span className='d-block mb-1'>{username}</span>
                            <span className='d-block mb-2'><IoLocationOutline className='d-inline'/>{country}-{state}-{address}</span>
                            <div className='mx-4'>
                              <Rating readOnly  style={{ maxWidth: '150px' }} value={rating} onChange={setRating}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-8' >
                    <div className='FreeInfo mr-3'>
                        <span className='d-block'>Age:</span>
                        <p className='mb-1'>{age}</p>
                        <span className='d-block'>phone:</span>
                        <p className='mb-1'>{phoneNumber}</p>
                        <span className='d-block '>Zip Code:</span>
                        <p className='mb-1'>{zip}</p>
                        <span className=' d-block '>Languages:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                            {selectedLangueges.map((lang)=><span className='languages' key={lang}>{lang}</span>)}
                        </div>
                    </div>
                    <div className='FreeInfo'>
                        <span className='d-block'>Your Title:</span>
                        <p className='mb-1'>{yourTitle}</p>
                        <span className='d-block'>Skills:</span>
                        <div style={{margin:"10px 0 15px 30px"}}>
                        {selectedSkills.map((skill)=><span className='skills' key={skill}>{skill}</span>)}
                        </div>
                        <span className='d-block'>Description:</span>
                        <p className='mb-1'>{description}</p>
                        <span className='d-block'>PortfolioURl:</span>
                        <a href={portfolioURL} className='mb-1'>portfolioURL</a>
                        {education && <div><span className='d-block'>Education:</span>
                        <p className='mb-1'>{education }</p></div>}
                        {experience && <div><span className='d-block'>Experience:</span>
                        <p >{experience}</p></div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
