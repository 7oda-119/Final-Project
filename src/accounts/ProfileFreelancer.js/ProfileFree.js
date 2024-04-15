import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import '.././CSS.css'
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
export default function ProfileFree() {
    const navigate = useNavigate();
    function navToProtfolio(){
        navigate('/protfolio')
    }

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

  return (
    <div className='account d-flex justify-content-center '>
            <div className="account-info col-lg-10 row ">
                <div className="head d-flex py-3 " > 
                    <div>
                        <img className='user-photo' src={profilePicture} alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                       
                    </div>
                    <div className='px-3'>
                        <h2>{firstName} {lastName}</h2>
                        <p>{username}</p>
                        <span><IoLocationOutline className='d-inline'/>{address}</span>
                    </div>    
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
                        
                  </div>
                  <div className="about col-lg-7 ">
                    <div className='d-flex justify-content-between'>
                      <div className=" px-2 py-3">
                        <h3 className='py-2'>{yourTitle}</h3>
                          <p className='px-4'>{description}</p>
                      </div>  
                      {hourlyRate?(
                        <p className='py-4'>{hourlyRate}/hour</p>):
                        (<p></p>)
                      }
                    </div>
                    <h4>PortfolioURL:</h4>
                    <a href={portfolioURL} className='linkedin'>portfolioURL</a>
                    
                  </div>
                </div>           
            </div>
    
        </div>
  )
}
