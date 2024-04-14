import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import './FreelancerProfile.css'
import { useNavigate } from 'react-router-dom';
import EditInfoFreelancer from '../../Modal/EditInfoFreelancer';
import Cookie from 'cookie-universal'
import Addportfolio from '../../Modal/Addportfolio';
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
export default function ProfileFree() {
    const navigate = useNavigate();
    function navToProtfolio(){
        navigate('/protfolio')
    }
    
    

      //open modal of freelancer information
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    
    const openInfoModal = () => {
      setModalInfoOpen(true);
    };
    
    const closeInfiModal = () => {
      setModalInfoOpen(false);
    };
    
    const handleSaveInfo = (data) => {
      // Perform save logic with the data object
      console.log('Saved data:', data);
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setusername] = useState('');
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

  //open modal of picture of freelancer
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const openImageModal = () => {
    setIsModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsModalOpen(false);
  };
  
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const saveImage = async () => {
    try{
      console.log(selectedImage)
    }catch(error){
      console.log(error)
    }
    closeImageModal();
  };

  const freelancerInfo = {
    firstName, lastName, age, description, 
    phoneNumber, hourlyRate, experience, 
    portfolioURL, yourTitle, zip
  };

  return (
    <div className='account d-flex justify-content-center '>
        <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Photo</h5>
              <button type="button" className="btn-close" onClick={closeImageModal}></button>
            </div>
            <div className="modal-body">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeImageModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={saveImage}>Save</button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
            <div className="account-info col-lg-12 row ">
                <div className="head d-flex py-3 " > 
                    <div>
                        <img className='user-photo' src={profilePicture} alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <AiFillEdit className='edit-img' onClick={openImageModal}/>
                    </div>
                    <div className='px-3'>
                        <h2>{firstName} {lastName}</h2>
                        <p>{username}</p>
                        <span><IoLocationOutline className='d-inline'/>{address}</span>
                    </div>    
                </div>
                <div className='addp'>
                <button type='button' className='btn btn-primary' onClick={navToProtfolio}>Protfolio</button>
                </div>
                <div className="row">
                  <div className="Skills col-lg-5 py-3">
                        <div className='py-2'>
                            <h4>Skills</h4>
                            {selectedSkills.map((skill)=><span key={skill}>{skill}</span>)}
                        </div>  
                        <div className='py-3'>
                            <h4>Languages:</h4>
                            {selectedLangueges.map((lang)=><span key={lang}>{lang}</span>)}
                        </div>
                        <button className='edit-skills' ><FaUserEdit /></button>
                  </div>
                  <div className="about col-lg-7 ">
                    <div className='d-flex justify-content-between'>
                      <div className=" px-2 py-3">
                        <h3 className='py-2'>{yourTitle}</h3>
                          <p className='px-4'> 
                            {description} 
                          </p>
                      </div>  
                      {hourlyRate?(
                        <p className='py-4'>{hourlyRate}/hour</p>):
                        (<p></p>)
                      }
                    </div>
                    <h4>PortfolioURL:</h4>
                    <a href={portfolioURL} className='linkedin'>portfolioURL</a>
                    <button className='edit-info' onClick={openInfoModal}><FaUserEdit /></button>
                  </div>
                </div>           
            </div>
            <EditInfoFreelancer isOpen={modalInfoOpen} closeModal={closeInfiModal}  />
    
        </div>
  )
}
