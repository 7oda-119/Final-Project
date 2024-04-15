import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
import '.././CSS.css'
import EditInfoFreelancer from '../../Modal/EditInfoFreelancer';
export default function Test() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
  console.log(token)

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
      console.error(error);
    }
  };

    const [rating, setRating] = useState(2)
    //open modal of picture of freelancer
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openImageModal = () => {
    setIsModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  //open modal of freelancer information
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
    
  const openInfoModal = () => {
    setModalInfoOpen(true);
  };
  
  const closeInfiModal = () => {
    setModalInfoOpen(false);
  };

  return (
    <div className='AccFree row'>
        <div className=' col-12 row d-flex justify-content-center'>
            <div>
                <button className='editInfo btn btn-success' onClick={openInfoModal}>Edit Information</button>
                <button className='edit-sk-lang btn btn-success' >Edit Language&Skills</button>
            </div>
            <div className=' col-6 row d-flex justify-content-between'>
                <h4>My Info</h4>
                <div className='rate col-4 py-3 ' style={{background:"white"}}>
                    <div className='d-flex justify-content-center'>
                        <img className='user-photo' src='https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <AiFillEdit className='edit-img' onClick={openImageModal}/>
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <div className='text-center'>
                            <span className='d-block mb-1' style={{fontWeight:'600'}}>{firstName} {lastName}</span>
                            <span className='d-block mb-1'>{username}</span>
                            <span className='d-block mb-2'><IoLocationOutline className='d-inline'/>{country}-{state}-{address}</span>
                            <Rating readOnly  style={{ maxWidth: '150px' }} value={rating} onChange={setRating}/>
                        </div>
                    </div>
                </div>
                <div className='col-8' >
                    <div className='FreeInfo mr-3'>
                        <span className='d-block mb-1'>Age:</span>
                        <p>{age}</p>
                        <span className='d-block mb-1'>phone:</span>
                        <p>{phoneNumber}</p>
                        <span className='d-block mb-1'>Zip Code:</span>
                        <p>{zip}</p>
                        <span className=' d-block mb-1'>Languages:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                            {selectedLangueges.map((lang)=><span className='languages' key={lang}>{lang}</span>)}
                        </div>
                    </div>
                    <div className='FreeInfo'>
                        <span className='d-block'>Your Title:</span>
                        <p>23</p>
                        <span className='d-block'>Skills:</span>
                        <div style={{margin:"10px 0 15px 30px"}}>
                        {selectedSkills.map((skill)=><span className='skills' key={skill}>{skill}</span>)}
                        </div>
                        <span className='d-block'>Description:</span>
                        <p>{description}</p>
                        {education && <div><span className='d-block'>Education:</span>
                        <p>{education }</p></div>}
                        {experience && <div><span className='d-block'>Experience:</span>
                        <p>{experience}</p></div>}
                    </div>

                </div>
            </div>
        </div>
        <EditInfoFreelancer isOpen={modalInfoOpen} closeModal={closeInfiModal}  />
    </div>
  )
}