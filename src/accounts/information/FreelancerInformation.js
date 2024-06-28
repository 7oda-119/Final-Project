import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl, server } from '../../Api/Api';
import '.././CSS.css'
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import LanguageChange from './LanguageChange';
import SkillChange from './SkillChange';
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
  const [profilePicture, setProfilePicture] = useState('');
  const [selectedLangueges, setSelectedLangueges] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rating, setRating] = useState()
     //call token 
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

    //fetch freelancer information
  useEffect(() => {
    fetchData();
    fetchMoney();
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

  
  //image change
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleCloseImg = () => {
    setOpen(false);
  };

  const handleOpenImg = () => setOpen(true);
  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };
  
  const submitImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
  
      await axios.post(`${baseUrl}/api/Account/ChangeProfilePicture-FreeLancer`, formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
      handleCloseImg();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigateToEdit = () =>{
    navigate('/edit-freelancer');
  }
  
  //open change languages Modal
  const [openLang, setOpenLang] = useState(false);
  const openLngModal =()=>{
    setOpenLang(true);
  }
  const closeLngModal =()=>{
    setOpenLang(false);
  }

  //open change skill Modal
  const [openSkil, setOpenSkil] = useState(false);
  const openSkilModal =()=>{
    setOpenSkil(true);
  }
  const closeSkilModal =()=>{
    setOpenSkil(false);
  }

  //get money from payment
  const [money, setMoney] = useState(0)
  const pocketMoney = parseFloat(money)
  const fetchMoney = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/PaymentTest/Get-Freelancer-Money`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setMoney(response.data);
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
  return (
    <div className='AccFree row' style={{minHeight:'81vh'}}>
        <div className=' col-12 row d-flex justify-content-center'>
            <div className=' col-10 row d-flex justify-content-between'>
                <div className='rate col-4 py-3 ' style={{background:"white"}}>
                    <div className='d-flex justify-content-center'>
                      {console.log(`${server}${profilePicture.replace(/\\/g, '/')}`)}
                        <img className='user-photo' src={`${server}${profilePicture.replace(/\\/g, '/')}`} alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <button >
                          <AiFillEdit className="edit-img" onClick={handleOpenImg} />
                        </button>
                    </div>
                    {/* modal of edit image */}
                    <div className={`modal fade${open ? ' show' : ''}`} style={{ display: open ? 'block' : 'none' }}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="imageModalLabel">Upload Profile Picture</h5>
                            <button type="button" className="btn-close" onClick={handleCloseImg} aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <input type="file" className="form-control" id="imageInput" onChange={handleImageUpload} />
                          </div>
                          <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseImg}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={submitImageUpload}>Upload</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-center mt-2 left-info'>
                        <div className='text-center'>
                            <span className='d-block mb-1' style={{fontWeight:'600'}}>{firstName} {lastName}</span>
                            <span className='d-block mb-1'>{username}</span>
                            <span className='d-block mb-2'><IoLocationOutline className='d-inline'/>{country}-{state}-{address}</span>
                            <div className='mx-4'>
                              <Rating readOnly  style={{ maxWidth: '150px' }} value={rating} />
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
                        <span className='d-block'>Your Title:</span>
                        <p className='mb-1'>{yourTitle}</p>
                        <span className='d-block'>Description:</span>
                        <p className='mb-1'>{description}</p>

                        {education !== null && education !== 'null' ? (
                          <div>
                            <span className='d-block'>Education:</span>
                            <p className='mb-1'>{education}</p>
                          </div>
                        ) : null}
                        
                        {experience !== null && experience !== 'null' ? (
                          <div>
                            <span className='d-block'>Experience:</span>
                            <p className='mb-1'>{experience}</p>
                          </div>
                        ) : null}
                        
                        <span className='d-block'>PortfolioURl:</span>
                        <a href={portfolioURL} className='mb-1'>portfolioURL</a>
                        <FaUserEdit className='edit-info'onClick={navigateToEdit}/>
                        <div className='money'>
                          <h5>Your Money: <span>${pocketMoney.toFixed(2)}</span></h5>
                        </div>
                    </div>

                    <div className='Skill-lang'>
                    <span className=' d-block '>Languages:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                            {selectedLangueges.map((lang,index)=><span className='languages' key={index}>{lang}</span>)}
                        </div>
                        <span className='d-block'>Skills:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                        {selectedSkills.map((skill, index)=><span className='skills' key={index}>{skill}</span>)}
                        </div>
                        <IoIosAddCircle className="edit-lang" onClick={openLngModal}/>
                        <IoIosAddCircle className="edit-skill" onClick={openSkilModal}/>
                    </div>

                </div>
            </div>
        </div>
        <LanguageChange isOpen={openLang} onClose={closeLngModal}  token={token} fetchInfo={fetchData}/>
        <SkillChange isOpen={openSkil} onClose={closeSkilModal} token={token} fetchInfo={fetchData}/>
    </div>
  )
}
